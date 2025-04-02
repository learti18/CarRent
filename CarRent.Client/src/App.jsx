import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource/poppins';
import ScrollToTop from './hooks/ScrollToTop';
import DashboardLayout from './Components/Layouts/DashboardLayout';
import Layout from './Components/Layouts/Layout';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from './Contexts/AuthContext';
import { Toaster } from "sonner"
import { About, Accounts, AddRental, AddVehicle, AllCars, Calendar, CarDetails, ContactUs, Dashboard, EditVehicle, Home, Inbox, Payment, Reimbursements, Rentals, Settings, Signin, Signup, Unauthorized, UserProfile, Vehicles } from './Pages';
import { ProtectedRoute, AdminRoute, GuestRoute } from './Routes';

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
              <Route element={<ProtectedRoute/>}>
                <Route path='unauthorized' element={<Unauthorized/>} />
                <Route element={<Layout/>}>
                  <Route path='about' element={<About/>} />
                  <Route path='contactus' element={<ContactUs/>} />
                  <Route path='user-profile' element={<UserProfile/>} />
                  <Route path='cars' element={<AllCars/>} />
                  <Route path='cars/:id' element={<CarDetails/>} />
                  <Route path='cars/:id/payment' element={<Payment/>} />
                </Route>     
              </Route>
              <Route path='/' element={<Layout/>}>   
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
