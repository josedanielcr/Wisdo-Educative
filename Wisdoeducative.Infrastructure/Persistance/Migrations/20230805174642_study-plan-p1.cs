using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wisdoeducative.Infrastructure.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class studyplanp1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GrandingSystem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MinimumScore = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaximiumScore = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PassingGrade = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrandingSystem", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StudyPlanHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserDegreeId = table.Column<int>(type: "int", nullable: false),
                    GrandingSystemId = table.Column<int>(type: "int", nullable: false),
                    GradingSystemId = table.Column<int>(type: "int", nullable: false),
                    TotalCredits = table.Column<int>(type: "int", nullable: false),
                    EarnedCredits = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EntityChangeType = table.Column<int>(type: "int", nullable: false),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyPlanHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudyPlanHistories_GrandingSystem_GrandingSystemId",
                        column: x => x.GrandingSystemId,
                        principalTable: "GrandingSystem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudyPlanHistories_UserDegrees_UserDegreeId",
                        column: x => x.UserDegreeId,
                        principalTable: "UserDegrees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudyPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserDegreeId = table.Column<int>(type: "int", nullable: false),
                    GrandingSystemId = table.Column<int>(type: "int", nullable: false),
                    GradingSystemId = table.Column<int>(type: "int", nullable: false),
                    TotalCredits = table.Column<int>(type: "int", nullable: false),
                    EarnedCredits = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudyPlans_GrandingSystem_GrandingSystemId",
                        column: x => x.GrandingSystemId,
                        principalTable: "GrandingSystem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudyPlans_UserDegrees_UserDegreeId",
                        column: x => x.UserDegreeId,
                        principalTable: "UserDegrees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudyPlanHistories_GrandingSystemId",
                table: "StudyPlanHistories",
                column: "GrandingSystemId");

            migrationBuilder.CreateIndex(
                name: "IX_StudyPlanHistories_UserDegreeId",
                table: "StudyPlanHistories",
                column: "UserDegreeId");

            migrationBuilder.CreateIndex(
                name: "IX_StudyPlans_GrandingSystemId",
                table: "StudyPlans",
                column: "GrandingSystemId");

            migrationBuilder.CreateIndex(
                name: "IX_StudyPlans_UserDegreeId",
                table: "StudyPlans",
                column: "UserDegreeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudyPlanHistories");

            migrationBuilder.DropTable(
                name: "StudyPlans");

            migrationBuilder.DropTable(
                name: "GrandingSystem");
        }
    }
}
