import Hero from '../Components/Hero'
import HowItWorks from '../Components/HowItWorks'
import PopularRentals from '../Components/PopularRentals'

export default function Home() {
  return (
    <div className='bg-gray-100'>
        <Hero/>
        <HowItWorks />
        <PopularRentals/>
    </div>
  )
}
