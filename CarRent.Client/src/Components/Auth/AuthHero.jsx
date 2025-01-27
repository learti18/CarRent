import { Link } from "react-router-dom"

export default function AuthHero({ title, description }) {
  return (
    <div className="relative h-full">
      <div className="absolute shadow-md inset-0 bg-gradient-to-t from-black/60 to-black/20 rounded-2xl"></div>
      <img 
        src="background4.jpg" 
        alt="Luxury car showcase" 
        className="w-full h-full shadow-md object-cover rounded-2xl"
      />
      <Link to="/" className="absolute top-7 left-7 z-10">
        <div className="flex items-center gap-2 px-7 py-[5px] rounded-xl bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105">
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
            Car<span className="text-blue-500">Rent</span>
          </span>
        </div>
      </Link>
      <div className="absolute space-y-3 bottom-10 left-7 text-white">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="max-w-md text-gray-100">{description}</p>
      </div>
    </div>
  )
}
