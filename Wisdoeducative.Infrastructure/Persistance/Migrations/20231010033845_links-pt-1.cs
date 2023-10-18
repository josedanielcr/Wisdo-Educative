using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wisdoeducative.Infrastructure.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class linkspt1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseLinks_Courses_CourseId",
                table: "CourseLinks");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "CourseLinks",
                newName: "CourseEvaluationTaskId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseLinks_CourseId",
                table: "CourseLinks",
                newName: "IX_CourseLinks_CourseEvaluationTaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseLinks_CourseEvaluationTasks_CourseEvaluationTaskId",
                table: "CourseLinks",
                column: "CourseEvaluationTaskId",
                principalTable: "CourseEvaluationTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseLinks_CourseEvaluationTasks_CourseEvaluationTaskId",
                table: "CourseLinks");

            migrationBuilder.RenameColumn(
                name: "CourseEvaluationTaskId",
                table: "CourseLinks",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseLinks_CourseEvaluationTaskId",
                table: "CourseLinks",
                newName: "IX_CourseLinks_CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseLinks_Courses_CourseId",
                table: "CourseLinks",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
