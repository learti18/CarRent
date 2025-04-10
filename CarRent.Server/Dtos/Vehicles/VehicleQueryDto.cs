﻿namespace CarRent.Server.Dtos.Vehicles
{
    public class VehicleQueryDto
    {
        //required filters
        public DateOnly PickupDate { get; set; }
        public TimeOnly PickupTime { get; set; }
        public DateOnly DropOffDate { get; set; }
        public TimeOnly DropOffTime { get; set; }

        //optional filters
        public string? BodyType { get; set; }
        public int? Capacity { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }

        //sorting and paging
        public string? SortBy { get; set; }
        public string SortOrder { get; set; } = "asc";

        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
