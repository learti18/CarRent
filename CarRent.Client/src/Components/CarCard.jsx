import { Fuel, HeartIcon, LifeBuoy, Users } from "lucide-react"
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function CarCard({
    id,
    brand,
    type,
    fuelCapacity,
    transmission,
    seatingCapactity,
    pricePerDay,
    image }) {

    const [favorite,setFavorite] = useState()
    function toggleFavorite(){
        setFavorite(prevState => !prevState)
    }

  return (
    <div className="bg-white shadow-md p-6 rounded-xl max-w-[350px]">
        <div className="flex justify-between">
            <h2 className="text-lg font-bold">{brand}</h2>
            <HeartIcon className={`hover:scale-110 cursor-pointer transition-all text-gray-400 ${favorite && "fill-red-500 text-red-500"}`} onClick={toggleFavorite}/>
        </div>
        <p className="text-sm text-gray-400">{type}</p>
        <div className="flex flex-row justify-between md:flex-col">
            <div className="py-10 relative">
                <img src={image} alt="" className="w-3/4 flex-grow justify-self-center"/>
                <div className="absolute w-full h-20 bottom-0 top-0 mt-auto bg-gradient-to-t from-white"></div>
            </div>
            <div className="flex flex-col justify-center gap-5 md:flex-row">
                <div className="flex gap-1 text-gray-400">
                    <Fuel size={18}/>
                    <span className="text-xs">{fuelCapacity}L</span>
                </div>
                <div className="flex gap-1 text-gray-400">
                    <LifeBuoy size={18}/>
                    <span className="text-xs">{transmission}</span>
                </div>
                <div className="flex gap-1 text-gray-400">
                    <Users size={18}/>
                    <span className="text-xs">{seatingCapactity} People</span>
                </div>
            </div>
        </div>
        <div className="mt-5 flex justify-between items-center">
            <p className="font-bold">
                ${pricePerDay}/
                <span className="text-gray-400 text-xs"> day</span>
            </p>
            <Link
                to={`cars/${id}`} 
                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md  transition-colors duration-300 hover:bg-blue-600">
                Rent Now
            </Link>
        </div>
    </div>
  )
}
