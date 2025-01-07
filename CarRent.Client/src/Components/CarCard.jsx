import { Fuel, LifeBuoy, Users } from "lucide-react"
import { Link } from 'react-router-dom';
import { Tooltip } from "react-tooltip";
import FavoriteButton from "./Buttons/FavoriteButton";

export default function CarCard({
    id,
    brand,
    type,
    fuelCapacity,
    transmission,
    seatingCapactity,
    pricePerDay,
    image }) {

    

  return (
    <div className="bg-white shadow-md p-6 rounded-xl">
        <div className="flex justify-between">
            <h2 className="text-lg font-bold">{brand}</h2>
            <FavoriteButton/>
        </div>
        <p className="text-sm text-gray-400">{type}</p>
        <div className="flex flex-row justify-between gap-6 md:flex-col md:mb-8">
            <div className="py-7 md:py-10 relative">
                <img src={image} alt="" className="flex-grow justify-self-center max-h-24"/>
                <div className="absolute w-full h-24 bottom-0 top-0 mt-auto bg-gradient-to-t from-white"></div>
            </div>
            <div className="flex flex-col justify-start md:justify-between gap-5 md:flex-row">
                <div className="flex gap-1 text-gray-400" data-tooltip-content={`Fuel capacity:${fuelCapacity}`}>
                    <Fuel size={18}/>
                    <span className="text-xs">{fuelCapacity}L</span>
                    <Tooltip/>
                </div>
                <div className="flex gap-1 text-gray-400" data-tip={`Transimssion:${transmission}`}>
                    <LifeBuoy size={18}/>
                    <span className="text-xs">{transmission}</span>
                    <Tooltip/>
                </div>
                <div className="flex gap-1 text-gray-400" data-tip={`Seating capacity:${seatingCapactity}`}>
                    <Users size={18}/>
                    <span className="text-xs">{seatingCapactity} People</span>
                    <Tooltip/>
                </div>
            </div>
        </div>
        <div className="mt-5 flex justify-between items-center">
            <p className="font-bold">
                ${pricePerDay}/
                <span className="text-gray-400 text-xs"> day</span>
            </p>
            <Link
                to={`${id}`} 
                className="bg-blue-500 text-white text-sm px-5 py-2 rounded-md  transition-colors duration-300 hover:bg-blue-600">
                Rent Now
            </Link>
        </div>
    </div>
  )
}
