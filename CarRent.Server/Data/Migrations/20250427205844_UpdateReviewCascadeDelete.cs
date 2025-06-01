using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateReviewCascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Vehicles_VehicleId",
                table: "Reviews");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Vehicles_VehicleId",
                table: "Reviews",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Vehicles_VehicleId",
                table: "Reviews");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Vehicles_VehicleId",
                table: "Reviews",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id");
        }
    }
}
