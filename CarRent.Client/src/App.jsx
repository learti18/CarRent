import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import '@fontsource/poppins';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import AllCars from './Pages/AllCars';
import CarDetails from './Pages/CarDetails';
import Layout from './Components/Layout';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';

function App() {

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='about' element={<About/>} />
            <Route path='contactus' element={<ContactUs/>} />
            <Route path='cars' element={<AllCars/>} />
            <Route path='cars/:id' element={<CarDetails/>} />
          </Route>
          <Route path='sign-up' element={<Signup/>} />
          <Route path='sign-in' element={<Signin/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
