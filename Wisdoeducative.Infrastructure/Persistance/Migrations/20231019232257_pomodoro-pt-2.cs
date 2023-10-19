using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wisdoeducative.Infrastructure.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class pomodoropt2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pomodoros_CourseEvaluationTasks_courseEvaluationTaskId",
                table: "Pomodoros");

            migrationBuilder.DropColumn(
                name: "CousrEvaluationTaskId",
                table: "Pomodoros");

            migrationBuilder.RenameColumn(
                name: "courseEvaluationTaskId",
                table: "Pomodoros",
                newName: "CourseEvaluationTaskId");

            migrationBuilder.RenameIndex(
                name: "IX_Pomodoros_courseEvaluationTaskId",
                table: "Pomodoros",
                newName: "IX_Pomodoros_CourseEvaluationTaskId");

            migrationBuilder.AlterColumn<int>(
                name: "CourseEvaluationTaskId",
                table: "Pomodoros",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Pomodoros_CourseEvaluationTasks_CourseEvaluationTaskId",
                table: "Pomodoros",
                column: "CourseEvaluationTaskId",
                principalTable: "CourseEvaluationTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pomodoros_CourseEvaluationTasks_CourseEvaluationTaskId",
                table: "Pomodoros");

            migrationBuilder.RenameColumn(
                name: "CourseEvaluationTaskId",
                table: "Pomodoros",
                newName: "courseEvaluationTaskId");

            migrationBuilder.RenameIndex(
                name: "IX_Pomodoros_CourseEvaluationTaskId",
                table: "Pomodoros",
                newName: "IX_Pomodoros_courseEvaluationTaskId");

            migrationBuilder.AlterColumn<int>(
                name: "courseEvaluationTaskId",
                table: "Pomodoros",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "CousrEvaluationTaskId",
                table: "Pomodoros",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Pomodoros_CourseEvaluationTasks_courseEvaluationTaskId",
                table: "Pomodoros",
                column: "courseEvaluationTaskId",
                principalTable: "CourseEvaluationTasks",
                principalColumn: "Id");
        }
    }
}
