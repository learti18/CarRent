import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import '@fontsource/poppins';
import Signin from './Pages/Auth/Signin';
import Signup from './Pages/Auth/Signup';
import AllCars from './Pages/AllCars';
import CarDetails from './Pages/CarDetails';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import Payment from './Pages/Payment';
import ScrollToTop from './hooks/ScrollToTop';
import DashboardLayout from './Components/Layouts/DashboardLayout';
import Dashboard from './Pages/Dashboard/Dashboard';
import Layout from './Components/Layouts/Layout';
import Rentals from './Pages/Dashboard/Rentals/Rentals';
import { Calendar, Inbox } from 'lucide-react';
import Accounts from './Pages/Dashboard/Accounts';
import Settings from './Pages/Dashboard/Settings';
import Reimbursements from './Pages/Dashboard/Reimbursements';
import AddRental from './Pages/Dashboard/Rentals/AddRental';
import Vehicles from './Pages/Dashboard/Vehicles/Vehicles';
import AddVehicle from './Pages/Dashboard/Vehicles/AddVehicle';
import EditVehicle from './Pages/Dashboard/Vehicles/EditVehicle';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from './Contexts/AuthContext';
import ProtectedRoute from './Routes/ProtectedRoute';
import GuestRoute from './Routes/GuestRoute';
import AdminRoute from './Routes/AdminRoute';
import Unauthorized from './Pages/Unauthorized';
import { Toaster } from "sonner"

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors/>
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop/>
            <Routes>
              {/* user routes */}
              <Route element={<Layout/>}>
                <Route path='/unauthorized' element={<Unauthorized/>} />
                <Route element={<ProtectedRoute/>}>
                  <Route path='about' element={<About/>} />
                  <Route path='contactus' element={<ContactUs/>} />
                  <Route path='cars' element={<AllCars/>} />
                  <Route path='cars/:id' element={<CarDetails/>} />
                  <Route path='cars/:id/payment' element={<Payment/>} />
                </Route>        
                <Route path='/' element={<Home/>}/>       
              </Route>
              
              {/* guest routes */}
              <Route element={<GuestRoute />}>
                  <Route path='sign-up' element={<Signup/>} />
                  <Route path='sign-in' element={<Signin/>} />
              </Route>
              
              {/* admin dashboard routes */}
              <Route element={<AdminRoute/>}>
                <Route path='/dashboard' element={<DashboardLayout/>}>
                  <Route index element={<Dashboard/> }/>
                  <Route path='vehicles' element={<Vehicles/>} />
                  <Route path='vehicles/new' element={<AddVehicle/>} />
                  <Route path='vehicles/edit/:id' element={<EditVehicle/>} />
                  <Route path='rentals' element={<Rentals/> }/>
                  <Route path='rentals/new' element={<AddRental/>} />
                  <Route path='inbox' element={<Inbox/>}/>
                  <Route path='accounts' element={<Accounts/>}/>
                  <Route path='calendar' element={<Calendar/>} />
                  <Route path='reimbursements' element={<Reimbursements/>} />
                  <Route path='settings' element={<Settings/>} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
