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
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from './Contexts/AuthContext';
import ProtectedRoute from './Pages/ProtectedRoute';
import GuestRoute from './Pages/GuestRoute';

const queryClient = new QueryClient()

function App() {

  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster position='bottom-right'/>
          <BrowserRouter>
            <ScrollToTop/>
            <Routes>
              {/* user routes */}
              <Route element={<Layout/>}>
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
              <Route path='/dashboard' element={<DashboardLayout/>}>
                <Route element={<ProtectedRoute/>}>
                  <Route index element={<Dashboard/> }/>
                  <Route path='vehicles' element={<Vehicles/>} />
                  <Route path='vehicles/new' element={<AddVehicle/>} />
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
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
