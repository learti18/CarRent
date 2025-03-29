namespace CarRent.Server.Models
{
    public class FavoriteVehicle
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int VehicleId { get; set; }
        public DateTime PickupDate { get; set; }
        public DateTime DropOffDate { get; set; }

        public ApplicationUser User { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}
