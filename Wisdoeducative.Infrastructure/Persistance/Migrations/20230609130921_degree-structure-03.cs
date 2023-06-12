using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wisdoeducative.Infrastructure.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class degreestructure03 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DegreeHistories_DegreeStudyFields_StudyFieldId",
                table: "DegreeHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_DegreeHistories_DegreeTypes_TypeId",
                table: "DegreeHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_Degrees_DegreeStudyFields_StudyFieldId",
                table: "Degrees");

            migrationBuilder.DropForeignKey(
                name: "FK_Degrees_DegreeTypes_TypeId",
                table: "Degrees");

            migrationBuilder.DropTable(
                name: "AcademicScheduleHistories");

            migrationBuilder.DropTable(
                name: "AcademicSchedules");

            migrationBuilder.DropTable(
                name: "DegreeStudyFieldHistories");

            migrationBuilder.DropTable(
                name: "DegreeStudyFields");

            migrationBuilder.DropTable(
                name: "DegreeTypeHistories");

            migrationBuilder.DropTable(
                name: "DegreeTypes");

            migrationBuilder.DropIndex(
                name: "IX_Degrees_StudyFieldId",
                table: "Degrees");

            migrationBuilder.DropIndex(
                name: "IX_Degrees_TypeId",
                table: "Degrees");

            migrationBuilder.DropIndex(
                name: "IX_DegreeHistories_StudyFieldId",
                table: "DegreeHistories");

            migrationBuilder.DropIndex(
                name: "IX_DegreeHistories_TypeId",
                table: "DegreeHistories");

            migrationBuilder.RenameColumn(
                name: "TypeId",
                table: "Degrees",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "StudyFieldId",
                table: "Degrees",
                newName: "StudyField");

            migrationBuilder.RenameColumn(
                name: "TypeId",
                table: "DegreeHistories",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "StudyFieldId",
                table: "DegreeHistories",
                newName: "StudyField");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Degrees",
                newName: "TypeId");

            migrationBuilder.RenameColumn(
                name: "StudyField",
                table: "Degrees",
                newName: "StudyFieldId");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "DegreeHistories",
                newName: "TypeId");

            migrationBuilder.RenameColumn(
                name: "StudyField",
                table: "DegreeHistories",
                newName: "StudyFieldId");

            migrationBuilder.CreateTable(
                name: "AcademicScheduleHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AcademicScheduleId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EntityChangeType = table.Column<int>(type: "int", nullable: false),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcademicScheduleHistories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AcademicSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcademicSchedules", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DegreeStudyFieldHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DegreeStudyFieldId = table.Column<int>(type: "int", nullable: false),
                    EntityChangeType = table.Column<int>(type: "int", nullable: false),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DegreeStudyFieldHistories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DegreeStudyFields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DegreeStudyFields", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DegreeTypeHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DegreeTypeId = table.Column<int>(type: "int", nullable: false),
                    EntityChangeType = table.Column<int>(type: "int", nullable: false),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DegreeTypeHistories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DegreeTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DegreeTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Degrees_StudyFieldId",
                table: "Degrees",
                column: "StudyFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_Degrees_TypeId",
                table: "Degrees",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DegreeHistories_StudyFieldId",
                table: "DegreeHistories",
                column: "StudyFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_DegreeHistories_TypeId",
                table: "DegreeHistories",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_DegreeHistories_DegreeStudyFields_StudyFieldId",
                table: "DegreeHistories",
                column: "StudyFieldId",
                principalTable: "DegreeStudyFields",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DegreeHistories_DegreeTypes_TypeId",
                table: "DegreeHistories",
                column: "TypeId",
                principalTable: "DegreeTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Degrees_DegreeStudyFields_StudyFieldId",
                table: "Degrees",
                column: "StudyFieldId",
                principalTable: "DegreeStudyFields",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Degrees_DegreeTypes_TypeId",
                table: "Degrees",
                column: "TypeId",
                principalTable: "DegreeTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
