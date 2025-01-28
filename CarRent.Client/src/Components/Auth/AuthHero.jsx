import { Link } from "react-router-dom"
import Logo from '../Logo'

export default function AuthHero({ title, description }) {
  return (
    <div className="relative h-full">
      <div className="absolute shadow-md inset-0 bg-gradient-to-t from-black/60 to-black/20 rounded-2xl"></div>
      <img 
        src="background4.jpg" 
        alt="Luxury car showcase" 
        className="w-full h-full shadow-md object-cover rounded-2xl"
      />
      <div className="absolute top-7 left-7 z-10">
        <div className="px-7 py-3 rounded-xl bg-white/10 backdrop-blur-md shadow-lg 
                      transition-all duration-300 hover:bg-white/20">
          <Logo variant="gradient" />
        </div>
      </div>
      <div className="absolute space-y-3 bottom-10 left-7 text-white">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="max-w-md text-gray-100">{description}</p>
      </div>
    </div>
  )
}
