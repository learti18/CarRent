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

function App() {

  
  return (
    <>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='about' element={<About/>} />
            <Route path='contactus' element={<ContactUs/>} />
            <Route path='cars' element={<AllCars/>} />
            <Route path='cars/:id' element={<CarDetails/>} />
            <Route path='cars/:id/payment' element={<Payment/>} />
          </Route>

          <Route path='/dashboard' element={<DashboardLayout/>}>
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
          <Route path='signup' element={<Signup/>} />
          <Route path='signin' element={<Signin/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
