using CarRent.Server.Dtos.Vehicles;
using CarRent.Server.Enums;

namespace CarRent.Server.Dtos.Rental
{
    public class RentalDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }

        public PickupDropOffDto Pickup { get; set; }
        public PickupDropOffDto DropOff { get; set; }

        public VehicleDto Vehicle { get; set; }

        public RentalStatus Status { get; set; }
    }
}
