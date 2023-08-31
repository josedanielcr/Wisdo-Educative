using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wisdoeducative.Infrastructure.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class studyplanp5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudyPlanTermHistories_StudyPlans_StudyPlanId",
                table: "StudyPlanTermHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_StudyPlanTerms_StudyPlans_StudyPlanId",
                table: "StudyPlanTerms");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "CourseHistories");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "CourseHistories");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "CourseHistories");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "CourseHistories");

            migrationBuilder.AlterColumn<int>(
                name: "StudyTermStatus",
                table: "StudyPlanTerms",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "StudyPlanId",
                table: "StudyPlanTerms",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "StudyPlanTerms",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "PeriodNumber",
                table: "StudyPlanTerms",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "StudyPlanTerms",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "StudyPlanTerms",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "StudyTermStatus",
                table: "StudyPlanTermHistories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "StudyPlanTermId",
                table: "StudyPlanTermHistories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "StudyPlanId",
                table: "StudyPlanTermHistories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "StudyPlanTermHistories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "PeriodNumber",
                table: "StudyPlanTermHistories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "StudyPlanTermHistories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "StudyPlanTermHistories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_StudyPlanTermHistories_StudyPlans_StudyPlanId",
                table: "StudyPlanTermHistories",
                column: "StudyPlanId",
                principalTable: "StudyPlans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StudyPlanTerms_StudyPlans_StudyPlanId",
                table: "StudyPlanTerms",
                column: "StudyPlanId",
                principalTable: "StudyPlans",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudyPlanTermHistories_StudyPlans_StudyPlanId",
                table: "StudyPlanTermHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_StudyPlanTerms_StudyPlans_StudyPlanId",
                table: "StudyPlanTerms");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "StudyPlanTerms");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "StudyPlanTerms");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "StudyPlanTermHistories");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "StudyPlanTermHistories");

            migrationBuilder.AlterColumn<int>(
                name: "StudyTermStatus",
                table: "StudyPlanTerms",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StudyPlanId",
                table: "StudyPlanTerms",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "StudyPlanTerms",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PeriodNumber",
                table: "StudyPlanTerms",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StudyTermStatus",
                table: "StudyPlanTermHistories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StudyPlanTermId",
                table: "StudyPlanTermHistories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StudyPlanId",
                table: "StudyPlanTermHistories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "StudyPlanTermHistories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PeriodNumber",
                table: "StudyPlanTermHistories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Courses",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "Courses",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Courses",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "CourseHistories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "CourseHistories",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "CourseHistories",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "CourseHistories",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_StudyPlanTermHistories_StudyPlans_StudyPlanId",
                table: "StudyPlanTermHistories",
                column: "StudyPlanId",
                principalTable: "StudyPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudyPlanTerms_StudyPlans_StudyPlanId",
                table: "StudyPlanTerms",
                column: "StudyPlanId",
                principalTable: "StudyPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
