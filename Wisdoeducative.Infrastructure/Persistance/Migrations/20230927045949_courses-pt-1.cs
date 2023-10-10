using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wisdoeducative.Infrastructure.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class coursespt1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseHistories_CourseSchedules_CourseScheduleId",
                table: "CourseHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_CourseSchedules_CourseScheduleId",
                table: "Courses");

            migrationBuilder.DropTable(
                name: "CourseSchedules");

            migrationBuilder.DropIndex(
                name: "IX_Courses_CourseScheduleId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_CourseHistories_CourseScheduleId",
                table: "CourseHistories");

            migrationBuilder.DropColumn(
                name: "CourseScheduleId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "CourseScheduleId",
                table: "CourseHistories");


            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.CreateTable(
    name: "CourseEvaluations",
    columns: table => new
    {
        Id = table.Column<int>(nullable: false)
            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
        CourseId = table.Column<int>(nullable: false),
        Name = table.Column<string>(nullable: true),
        Description = table.Column<string>(nullable: true),
        Weight = table.Column<int>(nullable: false),
        Status = table.Column<int>(nullable: false)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_CourseEvaluations", x => x.Id);
        table.ForeignKey(
            name: "FK_CourseEvaluations_Courses_CourseId",
            column: x => x.CourseId,
            principalTable: "Courses",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    });

            migrationBuilder.CreateTable(
                name: "CourseEvaluationTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseEvaluationId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Weight = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    EvaluationStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseEvaluationTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseEvaluationTasks_CourseEvaluations_CourseEvaluationId",
                        column: x => x.CourseEvaluationId,
                        principalTable: "CourseEvaluations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseEvaluationTasks_CourseEvaluationId",
                table: "CourseEvaluationTasks",
                column: "CourseEvaluationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseEvaluationTasks");

            migrationBuilder.DropTable(
    name: "CourseEvaluations");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "CourseEvaluations",
                newName: "status");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "Users",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<int>(
                name: "CourseScheduleId",
                table: "Courses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CourseScheduleId",
                table: "CourseHistories",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EvaluationStatus",
                table: "CourseEvaluations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CourseSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WeekDay = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseSchedules", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Courses_CourseScheduleId",
                table: "Courses",
                column: "CourseScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseHistories_CourseScheduleId",
                table: "CourseHistories",
                column: "CourseScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseHistories_CourseSchedules_CourseScheduleId",
                table: "CourseHistories",
                column: "CourseScheduleId",
                principalTable: "CourseSchedules",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_CourseSchedules_CourseScheduleId",
                table: "Courses",
                column: "CourseScheduleId",
                principalTable: "CourseSchedules",
                principalColumn: "Id");
        }
    }
}
