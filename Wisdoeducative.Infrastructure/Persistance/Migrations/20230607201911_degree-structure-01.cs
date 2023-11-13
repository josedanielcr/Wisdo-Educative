using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wisdoeducative.Infrastructure.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class degreestructure01 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DegreeStudyFieldHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    DegreeStudyFieldId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EntityChangeType = table.Column<int>(type: "int", nullable: false),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    DegreeTypeId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EntityChangeType = table.Column<int>(type: "int", nullable: false),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
            
                migrationBuilder.InsertData(
                    table: "DegreeTypes",
                    columns: new[] { "Name", "Status" },
                    values: new object[,]
                    {
                        { "Bachelor's degree", 0 },
                        { "Master's Degree", 0 },
                        { "Associate degree", 0 },
                        { "Doctorate", 0 },
                        { "Specialist degree", 0 }
                    }
                );
   
            migrationBuilder.CreateTable(
                name: "DegreeHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudyFieldId = table.Column<int>(type: "int", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    DegreeId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EntityChangeType = table.Column<int>(type: "int", nullable: false),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DegreeHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DegreeHistories_DegreeStudyFields_StudyFieldId",
                        column: x => x.StudyFieldId,
                        principalTable: "DegreeStudyFields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DegreeHistories_DegreeTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "DegreeTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Degrees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudyFieldId = table.Column<int>(type: "int", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Degrees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Degrees_DegreeStudyFields_StudyFieldId",
                        column: x => x.StudyFieldId,
                        principalTable: "DegreeStudyFields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Degrees_DegreeTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "DegreeTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DegreeHistories_StudyFieldId",
                table: "DegreeHistories",
                column: "StudyFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_DegreeHistories_TypeId",
                table: "DegreeHistories",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Degrees_StudyFieldId",
                table: "Degrees",
                column: "StudyFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_Degrees_TypeId",
                table: "Degrees",
                column: "TypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DegreeHistories");

            migrationBuilder.DropTable(
                name: "Degrees");

            migrationBuilder.DropTable(
                name: "DegreeStudyFieldHistories");

            migrationBuilder.DropTable(
                name: "DegreeTypeHistories");

            migrationBuilder.DropTable(
                name: "DegreeStudyFields");

            migrationBuilder.DropTable(
                name: "DegreeTypes");
        }
    }
}
