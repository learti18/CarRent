using CarRent.Server.Dtos.Vehicles;
using CarRent.Server.Enums;

namespace CarRent.Server.Dtos.Rental
{
    public class RentalResponseDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }

        public string UserId { get; set; }
        public bool hasReview { get; set; }

        public PickupDropOffDto Pickup { get; set; }
        public PickupDropOffDto DropOff { get; set; }

        public RentalVehicleDto Vehicle { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
    }
}
