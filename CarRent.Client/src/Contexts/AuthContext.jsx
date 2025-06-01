import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { AuthReducer, initialState } from "./../Utils/AuthReducer";
import { setAccessToken } from "./../Utils/TokenManager";
import { setupAuthInterceptors } from "./../Services/Api";
import {
  getCurrentUserName,
  hasAuthenticatedSession,
  setCurrentUser,
  setCurrentUsername,
} from "../Utils/UserStore";
import { STATUS } from "../Utils/AuthStatus";
import {
  authenticateWithStoredCredentials,
  calculateRefreshTime,
  formatUserData,
  refreshAuthToken,
} from "../Services/AuthService";

export const AuthContext = createContext({
  ...initialState,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  setAuthenticationStatus: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    ...initialState,
    status: STATUS.PENDING, // Start with pending to prevent flashing
  });
  const isInitialAuthCheckComplete = useRef(false);
  const tokenRefreshTimer = useRef(null);
  const authStateRef = useRef(state);

  // Update ref when state changes
  useEffect(() => {
    authStateRef.current = state;
  }, [state]);

  const login = useCallback(
    (user, token, expiresAt) => {
      setAccessToken(token);
      // Ensure we have the complete user data including profile image
      const completeUserData = {
        ...user,
        profileImageUrl: user.profileImageUrl || state.user?.profileImageUrl,
      };
      dispatch({
        type: "login",
        payload: { user: completeUserData, token, expiresAt },
      });
    },
    [state.user]
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    dispatch({ type: "logout" });
    if (tokenRefreshTimer.current) {
      clearTimeout(tokenRefreshTimer.current);
    }
  }, []);

  const updateUser = useCallback(
    (user) => {
      // Ensure we preserve existing user data when updating
      const updatedUser = {
        ...state.user,
        ...user,
      };
      dispatch({ type: "updateUser", payload: updatedUser });
    },
    [state.user]
  );

  const setAuthenticationStatus = useCallback((status) => {
    dispatch({ type: "status", payload: status });
  }, []);

  // Handle storage changes for cross-tab authentication
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "auth_status") {
        const isAuthenticated = event.newValue === "true";
        isAuthenticated ? window.location.reload() : logout();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [logout]);

  // Initial authentication check
  useEffect(() => {
    const checkStoredAuth = async () => {
      if (isInitialAuthCheckComplete.current) return;
      isInitialAuthCheckComplete.current = true;

      setupAuthInterceptors({ token: null, login, logout });

      const storedUserName = getCurrentUserName();
      const hasSession = hasAuthenticatedSession();

      if (!storedUserName && !hasSession) {
        setAuthenticationStatus(STATUS.IDLE);
        return;
      }

      try {
        const response = await authenticateWithStoredCredentials(
          storedUserName
        );
        const { data } = response;

        if (data.username) {
          setCurrentUsername(data.username);
        }
        if (data) {
          setCurrentUser(data);
        }

        const formattedUser = formatUserData(data);
        login(formattedUser, data.token, data.expiresAt);
        setAuthenticationStatus(STATUS.SUCCESS);
      } catch (error) {
        console.error("Initial authentication failed", error);
        setAuthenticationStatus(STATUS.FAILED);
      }
    };

    checkStoredAuth();
  }, [login, logout, setAuthenticationStatus]);

  // Token refresh logic
  useEffect(() => {
    if (!state.isAuthenticated || !state.expiresAt) return;

    const refreshTime = calculateRefreshTime(state.expiresAt);

    if (tokenRefreshTimer.current) {
      clearTimeout(tokenRefreshTimer.current);
    }

    tokenRefreshTimer.current = setTimeout(async () => {
      try {
        const { data } = await refreshAuthToken();
        const formattedUser = formatUserData(data);
        login(formattedUser, data.token, data.expiresAt);
      } catch (error) {
        console.error("Token refresh failed", error);
        logout();
      }
    }, refreshTime);

    return () => {
      if (tokenRefreshTimer.current) {
        clearTimeout(tokenRefreshTimer.current);
      }
    };
  }, [state.expiresAt, login, logout]);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      updateUser,
      setAuthenticationStatus,
    }),
    [state, login, logout, updateUser, setAuthenticationStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
