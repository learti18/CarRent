import { Calendar1Icon, Car, MapPin } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="my-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-5 mb-10 px-7">
          <p className="text-md md:text-lg text-blue-600 bg-blue-100 px-3 py-1 rounded-lg">How it works</p>
          <h1 className="text-2xl md:text-4xl font-bold">Rent with following 3 working steps</h1>
        </div>
        <div className="flex flex-col justify-center md:flex-row items-center gap-10 my-16">
          <div className="text-center max-w-44 space-y-3">
            <div className="justify-self-center bg-blue-50 p-5 rounded-lg">
              <MapPin size={50} color="#1572D3" />
            </div>
            <h2>Choose location</h2>
            <p className="text-gray-400">Choose your location and find your best car</p>
          </div>
          <div className="text-center max-w-44 space-y-3">
            <div className="justify-self-center bg-blue-50 p-5 rounded-lg">
              <Calendar1Icon size={50} color="#1572D3" />
            </div>
            <h2>Choose Date</h2>
            <p className="text-gray-400">Select your preferred date and time</p>
          </div>
          <div className="text-center max-w-44 space-y-3">
            <div className="justify-self-center bg-blue-50 p-5 rounded-lg">
              <Car size={50} color="#1572D3" />
            </div>
            <h2>Pick Your Car</h2>
            <p className="text-gray-400">Choose your car and confirm the booking</p>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden my-20 mb-32">
        <div className="flex space-x-16 animate-scroll whitespace-nowrap">
      
          <div className="flex space-x-16 min-w-full">
            <div className="inline-flex items-center">
              <img src="honda.svg" alt="Honda" className="w-36 h-auto" />
            </div>
            <div className="inline-flex items-center">
              <img src="jaguar.svg" alt="Jaguar" className="w-36 h-auto" />
            </div>
            <div className="inline-flex items-center">
              <img src="audi.svg" alt="Audi" className="w-36 h-auto" />
            </div>
            <div className="inline-flex items-center">
              <img src="volvo.svg" alt="Volvo" className="w-36 h-auto" />
            </div>
            <div className="inline-flex items-center">
              <img src="nissan.svg" alt="Volvo" className="w-36 h-auto" />
            </div>
          </div>
    
          <div className="flex space-x-16 min-w-full">
            <div className="inline-flex items-center">
              <img src="honda.svg" alt="Honda" className="w-36 h-auto" />
            </div>
            <div className="inline-flex items-center">
              <img src="jaguar.svg" alt="Jaguar" className="w-36 h-auto" />
            </div>
            <div className="inline-flex items-center">
              <img src="audi.svg" alt="Audi" className="w-36 h-auto" />
            </div>
            <div className="inline-flex items-center">
              <img src="volvo.svg" alt="Volvo" className="w-36 h-auto" />
            </div>
            <div className="inline-flex items-center">
              <img src="nissan.svg" alt="Volvo" className="w-36 h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
