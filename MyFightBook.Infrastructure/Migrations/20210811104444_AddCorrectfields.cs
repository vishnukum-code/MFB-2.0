using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFightBook.Infrastructure.Migrations
{
    public partial class AddCorrectfields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "securityStamp",
                table: "userRegistration",
                newName: "SecurityStamp");

            migrationBuilder.RenameColumn(
                name: "passwordHash",
                table: "userRegistration",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "normalizedUsername",
                table: "userRegistration",
                newName: "NormalizedUserName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SecurityStamp",
                table: "userRegistration",
                newName: "securityStamp");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "userRegistration",
                newName: "passwordHash");

            migrationBuilder.RenameColumn(
                name: "NormalizedUserName",
                table: "userRegistration",
                newName: "normalizedUsername");
        }
    }
}
