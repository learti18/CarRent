using CarRent.Server.Enums;

namespace CarRent.Server.Models
{
    public class Rental
    {
        public int Id { get; set; }

        //user info
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;

        //pickup drop off info
        public string PickupCity { get; set; } = string.Empty;
        public DateTime PickupDateTime { get; set; }

        public string DropOffCity { get; set; } = string.Empty;
        public DateTime DropOffDateTime { get; set; }

        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }

        public RentalStatus Status { get; set; }

        public int PaymentId { get; set; }
        public Payment Payment { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public decimal Amount { get; set; }


        public void UpdateStatus()
        {
            var today = DateTime.Today;

            if (Status == RentalStatus.Cancelled)
                return;

            if(today < PickupDateTime)
            {
                Status = RentalStatus.Upcoming;
            }
            else if(today >= PickupDateTime && today <= DropOffDateTime)
            {
                Status = RentalStatus.Active;
            }
            else if(today > DropOffDateTime)
            {
                Status = RentalStatus.Completed;
            }

        }
    }
}
