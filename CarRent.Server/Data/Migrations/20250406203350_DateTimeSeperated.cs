using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class DateTimeSeperated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DropOffDateTime",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "PickupDateTime",
                table: "Rentals");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DropOffDate",
                table: "Rentals",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "DropOffTime",
                table: "Rentals",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AddColumn<DateOnly>(
                name: "PickupDate",
                table: "Rentals",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "PickupTime",
                table: "Rentals",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DropOffDate",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "DropOffTime",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "PickupDate",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "PickupTime",
                table: "Rentals");

            migrationBuilder.AddColumn<DateTime>(
                name: "DropOffDateTime",
                table: "Rentals",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "PickupDateTime",
                table: "Rentals",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
