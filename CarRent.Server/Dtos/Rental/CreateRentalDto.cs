using CarRent.Server.Dtos.Payment;

namespace CarRent.Server.Dtos.Rental
{
    public class CreateRentalDto
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }

        public PickupDropOffDto Pickup { get; set; }
        public PickupDropOffDto DropOff { get; set; }

        public int VehicleId { get; set; }

        public PaymentDto Payment { get; set; }
    }
}
