import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import '@fontsource/poppins';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Footer from './Components/Footer/Footer';
import AllCars from './Pages/AllCars';
import CarDetails from './Pages/CarDetails';
import Layout from './Components/Layout';

function App() {

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='sign-in' element={<Signin/>} />
            <Route path='sign-up' element={<Signup/>} />
            <Route path='cars' element={<AllCars/>} />
            <Route path='cars/:id' element={<CarDetails/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
