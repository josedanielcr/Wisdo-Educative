using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wisdoeducative.Infrastructure.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class histories01 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleHistories_Roles_ChangedRoleId",
                table: "RoleHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_SubscriptionHistories_Subscriptions_ChangedSubscriptionId",
                table: "SubscriptionHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_UserHistories_Users_ChangedUserId",
                table: "UserHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_UserInterestHistories_UserInterests_ChangedInterestId",
                table: "UserInterestHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSubscriptionHistories_UserSubscriptions_ChangedUserSubscriptionId",
                table: "UserSubscriptionHistories");

            migrationBuilder.DropIndex(
                name: "IX_UserSubscriptionHistories_ChangedUserSubscriptionId",
                table: "UserSubscriptionHistories");

            migrationBuilder.DropIndex(
                name: "IX_UserInterestHistories_ChangedInterestId",
                table: "UserInterestHistories");

            migrationBuilder.DropIndex(
                name: "IX_UserHistories_ChangedUserId",
                table: "UserHistories");

            migrationBuilder.DropIndex(
                name: "IX_SubscriptionHistories_ChangedSubscriptionId",
                table: "SubscriptionHistories");

            migrationBuilder.DropIndex(
                name: "IX_RoleHistories_ChangedRoleId",
                table: "RoleHistories");

            migrationBuilder.RenameColumn(
                name: "ChangedUserSubscriptionId",
                table: "UserSubscriptionHistories",
                newName: "UserSubscriptionId");

            migrationBuilder.RenameColumn(
                name: "ChangedInterestId",
                table: "UserInterestHistories",
                newName: "UserInterestId");

            migrationBuilder.RenameColumn(
                name: "ChangedUserId",
                table: "UserHistories",
                newName: "UserStatus");

            migrationBuilder.RenameColumn(
                name: "ChangedSubscriptionId",
                table: "SubscriptionHistories",
                newName: "SubscriptionId");

            migrationBuilder.RenameColumn(
                name: "ChangedRoleId",
                table: "RoleHistories",
                newName: "Status");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "UserSubscriptionHistories",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastPayment",
                table: "UserSubscriptionHistories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "NextPayment",
                table: "UserSubscriptionHistories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "UserSubscriptionHistories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "UserSubscriptionHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubscriptionId",
                table: "UserSubscriptionHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UserSubscriptionHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InterestId",
                table: "UserInterestHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "UserInterestHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UserInterestHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "B2cId",
                table: "UserHistories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "UserHistories",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "UserHistories",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "UserHistories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "UserHistories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "UserHistories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "UserHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UserHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SubscriptionHistories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Name",
                table: "SubscriptionHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "SubscriptionHistories",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "SubscriptionHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "RoleHistories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Name",
                table: "RoleHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "RoleHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_UserHistories_RoleId",
                table: "UserHistories",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserHistories_Roles_RoleId",
                table: "UserHistories",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserHistories_Roles_RoleId",
                table: "UserHistories");

            migrationBuilder.DropIndex(
                name: "IX_UserHistories_RoleId",
                table: "UserHistories");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "UserSubscriptionHistories");

            migrationBuilder.DropColumn(
                name: "LastPayment",
                table: "UserSubscriptionHistories");

            migrationBuilder.DropColumn(
                name: "NextPayment",
                table: "UserSubscriptionHistories");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "UserSubscriptionHistories");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "UserSubscriptionHistories");

            migrationBuilder.DropColumn(
                name: "SubscriptionId",
                table: "UserSubscriptionHistories");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserSubscriptionHistories");

            migrationBuilder.DropColumn(
                name: "InterestId",
                table: "UserInterestHistories");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "UserInterestHistories");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserInterestHistories");

            migrationBuilder.DropColumn(
                name: "B2cId",
                table: "UserHistories");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "UserHistories");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "UserHistories");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "UserHistories");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "UserHistories");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "UserHistories");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "UserHistories");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserHistories");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "SubscriptionHistories");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "SubscriptionHistories");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "SubscriptionHistories");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "SubscriptionHistories");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "RoleHistories");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "RoleHistories");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "RoleHistories");

            migrationBuilder.RenameColumn(
                name: "UserSubscriptionId",
                table: "UserSubscriptionHistories",
                newName: "ChangedUserSubscriptionId");

            migrationBuilder.RenameColumn(
                name: "UserInterestId",
                table: "UserInterestHistories",
                newName: "ChangedInterestId");

            migrationBuilder.RenameColumn(
                name: "UserStatus",
                table: "UserHistories",
                newName: "ChangedUserId");

            migrationBuilder.RenameColumn(
                name: "SubscriptionId",
                table: "SubscriptionHistories",
                newName: "ChangedSubscriptionId");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "RoleHistories",
                newName: "ChangedRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSubscriptionHistories_ChangedUserSubscriptionId",
                table: "UserSubscriptionHistories",
                column: "ChangedUserSubscriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserInterestHistories_ChangedInterestId",
                table: "UserInterestHistories",
                column: "ChangedInterestId");

            migrationBuilder.CreateIndex(
                name: "IX_UserHistories_ChangedUserId",
                table: "UserHistories",
                column: "ChangedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionHistories_ChangedSubscriptionId",
                table: "SubscriptionHistories",
                column: "ChangedSubscriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleHistories_ChangedRoleId",
                table: "RoleHistories",
                column: "ChangedRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleHistories_Roles_ChangedRoleId",
                table: "RoleHistories",
                column: "ChangedRoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubscriptionHistories_Subscriptions_ChangedSubscriptionId",
                table: "SubscriptionHistories",
                column: "ChangedSubscriptionId",
                principalTable: "Subscriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserHistories_Users_ChangedUserId",
                table: "UserHistories",
                column: "ChangedUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserInterestHistories_UserInterests_ChangedInterestId",
                table: "UserInterestHistories",
                column: "ChangedInterestId",
                principalTable: "UserInterests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSubscriptionHistories_UserSubscriptions_ChangedUserSubscriptionId",
                table: "UserSubscriptionHistories",
                column: "ChangedUserSubscriptionId",
                principalTable: "UserSubscriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
