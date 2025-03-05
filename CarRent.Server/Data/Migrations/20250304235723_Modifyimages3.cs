using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class Modifyimages3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImagesJson",
                table: "Vehicles",
                newName: "Images");

            migrationBuilder.AddColumn<int>(
                name: "MyProperty",
                table: "Vehicles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "Vehicles");

            migrationBuilder.RenameColumn(
                name: "Images",
                table: "Vehicles",
                newName: "ImagesJson");
        }
    }
}
