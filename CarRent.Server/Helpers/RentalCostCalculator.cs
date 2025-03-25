namespace CarRent.Server.Helpers
{
    public static class RentalCostCalculator
    {
        public static decimal CalculateAmount(decimal dailyRate, DateTime pickupDate, DateTime dropOffDate)
        {
            var totalDays = (dropOffDate.Date - pickupDate.Date).Days;
            if (totalDays <= 0) totalDays = 1;

            return dailyRate * totalDays;
        }
    }
}
