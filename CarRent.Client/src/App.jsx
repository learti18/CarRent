import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@fontsource/poppins";
import ScrollToTop from "./hooks/ScrollToTop";
import DashboardLayout from "./Components/Layouts/DashboardLayout";
import Layout from "./Components/Layouts/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./Contexts/AuthContext";
import { Toaster } from "sonner";
import {
  About,
  Accounts,
  AddVehicle,
  AllCars,
  Calendar,
  CarDetails,
  ContactUs,
  Dashboard,
  EditVehicle,
  Home,
  Payment,
  Reimbursements,
  Rentals,
  Reviews,
  Settings,
  Signin,
  Signup,
  Unauthorized,
  UserProfile,
  Vehicles,
} from "./Pages";
import { ProtectedRoute, AdminRoute, GuestRoute } from "./Routes";
import { RentalProvider } from "./Contexts/RentalContext";
import { SearchFormProvider } from "./Contexts/SearchFormContext";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        <BrowserRouter>
          <AuthProvider>
            <SearchFormProvider>
              <ScrollToTop />
              <Routes>
                {/* user routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="unauthorized" element={<Unauthorized />} />
                  <Route element={<Layout />}>
                    <Route path="about" element={<About />} />
                    <Route path="contactus" element={<ContactUs />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="cars" element={<AllCars />} />
                    <Route path="cars/:id" element={<CarDetails />} />
                    <Route path="cars/:id/payment" element={<Payment />} />
                  </Route>
                </Route>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Home />} />
                </Route>

                {/* guest routes */}
                <Route element={<GuestRoute />}>
                  <Route path="sign-up" element={<Signup />} />
                  <Route path="sign-in" element={<Signin />} />
                </Route>

                {/* admin dashboard routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="vehicles" element={<Vehicles />} />
                    <Route path="vehicles/new" element={<AddVehicle />} />
                    <Route path="vehicles/edit/:id" element={<EditVehicle />} />
                    <Route path="rentals" element={<Rentals />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="accounts" element={<Accounts />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="reimbursements" element={<Reimbursements />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                </Route>
              </Routes>
            </SearchFormProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
