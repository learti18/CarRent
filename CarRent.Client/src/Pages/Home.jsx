import HowItWorks from './../Components/Home/HowItWorks';
import Hero from './../Components/Home/Hero';
import PopularRentals from './../Components/Home/PopularRentals';

export default function Home() {
  return (
    <div className='bg-gray-100'>
        <Hero/>
        <HowItWorks />
        <PopularRentals/>
    </div>
  )
}
