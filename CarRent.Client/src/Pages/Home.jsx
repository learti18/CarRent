import HowItWorks from './../Components/Home/HowItWorks';
import Hero from './../Components/Home/Hero';
import PopularRentals from './../Components/Home/PopularRentals';
import Contact from './contact';


export default function Home() {
  return (
    <div className='bg-gray-100'>
        <Hero/>
        <HowItWorks />
        <PopularRentals/>
        <Contact/>
    </div>
  )
}
