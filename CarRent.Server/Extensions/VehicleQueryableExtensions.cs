using CarRent.Server.Dtos.Vehicles;
using CarRent.Server.Models;

namespace CarRent.Server.Extensions
{
    public static class VehicleQueryableExtensions
    {
        public static IQueryable<Vehicle> ApplyFiltering(this IQueryable<Vehicle> vehicles, VehicleQueryDto filters)
        {
          
            if (!string.IsNullOrWhiteSpace(filters.BodyType))
            {
                vehicles = vehicles.Where(v => v.BodyType == filters.BodyType);
            }
            if (filters.Capacity.HasValue)
            {
                vehicles = vehicles.Where(v => v.Seats == filters.Capacity);
            }
            if (filters.MinPrice > 0)
            {
                vehicles = vehicles.Where(v => v.Price >= filters.MinPrice);
            }
            if (filters.MaxPrice > 0)
            {
                vehicles = vehicles.Where(v => v.Price <= filters.MaxPrice);
            }
            return vehicles;
        }
        public static IQueryable<Vehicle> ApplySorting(this IQueryable<Vehicle> vehicles, VehicleQueryDto filters)
        {
            switch(filters.SortBy.ToLower())
            {
                case "price":
                    vehicles = filters.SortOrder.ToLower() == "asc" ?
                        vehicles.OrderBy(v => v.Price) :
                        vehicles.OrderByDescending(v => v.Price);
                    break;
            }

            return vehicles;
        }
        
        public static IQueryable<Vehicle> ApplyPagination(this IQueryable<Vehicle> vehicles, VehicleQueryDto filters)
        {
            return vehicles
                .Skip((filters.PageNumber - 1) * filters.PageSize)
                .Take(filters.PageSize);
        }
    }
}
