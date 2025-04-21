import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
import Navbar from "./../Navbar/Navbar";
import { useAuth } from "../../Hooks/useAuth";
import { STATUS } from "../../Utils/AuthStatus";
import { LoaderBarsSpinner } from "../LoaderBarsSpinner";

export default function Layout() {
  const { status } = useAuth();

  return useMemo(() => {
    if (status === STATUS.PENDING) {
      return <LoaderBarsSpinner fullscreen />;
    }

    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mt-[72px]">
          <Outlet />
        </main>
        <Footer key="main-footer" />
      </div>
    );
  }, [status]);
}
