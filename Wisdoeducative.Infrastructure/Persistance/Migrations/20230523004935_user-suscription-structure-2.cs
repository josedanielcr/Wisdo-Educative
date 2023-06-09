using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wisdoeducative.Infrastructure.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class usersuscriptionstructure2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Name",
                table: "Subscriptions",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "Subscriptions",
                columns: new[] { "Name", "Description", "Price", "Status" },
                values: new object[,]
                {
                    { 0, "Access basic features at no cost", 0.0f, 0 },
                    { 1, "Unlock advanced features with a low monthly fee", 3.99f, 0 }
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Subscriptions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
