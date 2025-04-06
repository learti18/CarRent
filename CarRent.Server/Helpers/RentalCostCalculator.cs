namespace CarRent.Server.Helpers
{
    public static class RentalCostCalculator
    {
        public static decimal CalculateAmount(decimal dailyRate, DateOnly pickupDate, DateOnly dropOffDate)
        {
            var totalDays = (dropOffDate.Day - pickupDate.Day) + 1;
            if (totalDays <= 0) totalDays = 1;

            return dailyRate * totalDays;
        }
    }
}
