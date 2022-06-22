using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EdwardTodoAPI.Migrations
{
    public partial class StatusSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "StatusId", "Title" },
                values: new object[] { new Guid("9cce8e63-e19c-46bd-965f-d8a799588b5a"), "In Progress" });

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "StatusId", "Title" },
                values: new object[] { new Guid("a5977c47-e47d-4d8c-812d-34060ea68c16"), "Completed" });

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "StatusId", "Title" },
                values: new object[] { new Guid("aa5b5762-f173-48db-8e18-526adc06f578"), "New" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "StatusId",
                keyValue: new Guid("9cce8e63-e19c-46bd-965f-d8a799588b5a"));

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "StatusId",
                keyValue: new Guid("a5977c47-e47d-4d8c-812d-34060ea68c16"));

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "StatusId",
                keyValue: new Guid("aa5b5762-f173-48db-8e18-526adc06f578"));
        }
    }
}
