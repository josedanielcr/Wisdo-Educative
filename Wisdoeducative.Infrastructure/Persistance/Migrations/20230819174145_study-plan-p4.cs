using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wisdoeducative.Infrastructure.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class studyplanp4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudyPlanHistories_GrandingSystem_GrandingSystemId",
                table: "StudyPlanHistories");

            migrationBuilder.AlterColumn<int>(
                name: "TotalCredits",
                table: "StudyPlanHistories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "GrandingSystemId",
                table: "StudyPlanHistories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "GradingSystemId",
                table: "StudyPlanHistories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "EarnedCredits",
                table: "StudyPlanHistories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_StudyPlanHistories_GrandingSystem_GrandingSystemId",
                table: "StudyPlanHistories",
                column: "GrandingSystemId",
                principalTable: "GrandingSystem",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudyPlanHistories_GrandingSystem_GrandingSystemId",
                table: "StudyPlanHistories");

            migrationBuilder.AlterColumn<int>(
                name: "TotalCredits",
                table: "StudyPlanHistories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "GrandingSystemId",
                table: "StudyPlanHistories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "GradingSystemId",
                table: "StudyPlanHistories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EarnedCredits",
                table: "StudyPlanHistories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_StudyPlanHistories_GrandingSystem_GrandingSystemId",
                table: "StudyPlanHistories",
                column: "GrandingSystemId",
                principalTable: "GrandingSystem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
