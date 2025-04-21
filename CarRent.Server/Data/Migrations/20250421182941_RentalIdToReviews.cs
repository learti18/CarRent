using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class RentalIdToReviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_AspNetUsers_UserId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Vehicles_VehicleId",
                table: "Reviews");

            migrationBuilder.AddColumn<int>(
                name: "RentalId",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_RentalId",
                table: "Reviews",
                column: "RentalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_AspNetUsers_UserId",
                table: "Reviews",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Rentals_RentalId",
                table: "Reviews",
                column: "RentalId",
                principalTable: "Rentals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Vehicles_VehicleId",
                table: "Reviews",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_AspNetUsers_UserId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Rentals_RentalId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Vehicles_VehicleId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_RentalId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "RentalId",
                table: "Reviews");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_AspNetUsers_UserId",
                table: "Reviews",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Vehicles_VehicleId",
                table: "Reviews",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
