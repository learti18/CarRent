namespace CarRent.Server.Dtos.Favorites
{
    public class FavoriteVehicleDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int VehicleId { get; set; }
        public DateTime PickupDate { get; set; }
        public DateTime DropOffDate { get; set; }
    }
}
