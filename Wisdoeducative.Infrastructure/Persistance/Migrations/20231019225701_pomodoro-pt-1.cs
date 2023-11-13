using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wisdoeducative.Infrastructure.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class pomodoropt1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pomodoros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    courseEvaluationTaskId = table.Column<int>(type: "int", nullable: true),
                    CousrEvaluationTaskId = table.Column<int>(type: "int", nullable: false),
                    InitialTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pomodoros", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pomodoros_CourseEvaluationTasks_courseEvaluationTaskId",
                        column: x => x.courseEvaluationTaskId,
                        principalTable: "CourseEvaluationTasks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pomodoros_courseEvaluationTaskId",
                table: "Pomodoros",
                column: "courseEvaluationTaskId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pomodoros");
        }
    }
}
