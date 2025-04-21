import { Link } from "react-router-dom";
import CarCard from "../CarCard";
import { LoaderBarsSpinner } from "../LoaderBarsSpinner";
import { useAllVehicles } from "../../Queries/vehicles";

export default function PopularRentals() {
  const { data: vehicles, isLoading, error } = useAllVehicles();

  if (isLoading) {
    return <LoaderBarsSpinner />;
  }

  return (
    <div className="flex flex-col items-center py-14 max-w-7xl mx-auto">
      <div className="space-y-6 px-5 text-center">
        <p className="text-md md:text-lg text-blue-600 bg-blue-100 px-3 py-1 rounded-lg justify-self-center">
          Popular rental deals
        </p>
        <h1 className="text-2xl md:text-4xl font-semibold">
          Most popular cars rental deals
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-10 md:px-6 my-12">
        {vehicles?.slice(0, 4).map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
      <Link
        to="cars"
        className="text-lg text-blue-500 border-b border-blue-500 duration-200 hover:text-blue-700 hover:border-blue-700"
      >
        View All Cars
      </Link>
    </div>
  );
}
