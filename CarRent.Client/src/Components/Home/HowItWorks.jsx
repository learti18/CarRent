import { Calendar1Icon, Car, MapPin } from "lucide-react";
import BrandsSlider from "../BrandsSlider";

export default function HowItWorks() {
  return (
    <div className="my-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-5 mb-10 px-7">
          <p className="text-md md:text-lg text-blue-600 bg-blue-100 px-3 py-1 rounded-lg">How it works</p>
          <h1 className="text-2xl md:text-4xl font-semibold">Rent with following 3 working steps</h1>
        </div>
        {/* steps */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8 md:gap-14 my-12 max-w-5xl w-full">
            <div className="text-center max-w-52  space-y-3">
              <div className="justify-self-center bg-white shadow-sm p-6 rounded-xl">
                <MapPin size={50} color="#1572D3" />
              </div>
              <h2 className="font-semibold text-lg">Choose location</h2>
              <p className="text-gray-600">Choose your location and find the best car</p>
            </div>
            <div className="text-center max-w-52 space-y-3">
              <div className="justify-self-center bg-white shadow-sm p-6 rounded-xl">
                <Calendar1Icon size={50} color="#1572D3" />
              </div>
              <h2 className="font-medium text-lg">Choose Date</h2>
              <p className="text-gray-600">Select your preferred date and time</p>
            </div>
            <div className="text-center max-w-52 space-y-3">
              <div className="justify-self-center bg-white shadow-sm p-6 rounded-xl">
                <Car size={50} color="#1572D3" />
              </div>
              <h2 className="font-medium text-lg">Pick Your Car</h2>
              <p className="text-gray-600">Choose your car and confirm the booking</p>
            </div>
          </div>
        </div>
      </div>

      <BrandsSlider />
    </div>
  );
}
