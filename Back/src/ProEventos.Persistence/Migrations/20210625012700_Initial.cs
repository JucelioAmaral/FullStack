using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProEventos.Persistence.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblEventos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Local = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataEvento = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Tema = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QtdPessoas = table.Column<int>(type: "int", nullable: false),
                    ImagemURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Telefone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblEventos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblPalestrantes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MiniCurriculo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImagemURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Telefone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblPalestrantes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblLotes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Preco = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DataInicio = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DataFim = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Quantidade = table.Column<int>(type: "int", nullable: false),
                    EventoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblLotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblLotes_tblEventos_EventoId",
                        column: x => x.EventoId,
                        principalTable: "tblEventos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblPalestrantesEventos",
                columns: table => new
                {
                    PalestranteId = table.Column<int>(type: "int", nullable: false),
                    EventoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblPalestrantesEventos", x => new { x.EventoId, x.PalestranteId });
                    table.ForeignKey(
                        name: "FK_tblPalestrantesEventos_tblEventos_EventoId",
                        column: x => x.EventoId,
                        principalTable: "tblEventos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblPalestrantesEventos_tblPalestrantes_PalestranteId",
                        column: x => x.PalestranteId,
                        principalTable: "tblPalestrantes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblRedesSociais",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    URL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EventoId = table.Column<int>(type: "int", nullable: true),
                    PalestranteId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblRedesSociais", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblRedesSociais_tblEventos_EventoId",
                        column: x => x.EventoId,
                        principalTable: "tblEventos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_tblRedesSociais_tblPalestrantes_PalestranteId",
                        column: x => x.PalestranteId,
                        principalTable: "tblPalestrantes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblLotes_EventoId",
                table: "tblLotes",
                column: "EventoId");

            migrationBuilder.CreateIndex(
                name: "IX_tblPalestrantesEventos_PalestranteId",
                table: "tblPalestrantesEventos",
                column: "PalestranteId");

            migrationBuilder.CreateIndex(
                name: "IX_tblRedesSociais_EventoId",
                table: "tblRedesSociais",
                column: "EventoId");

            migrationBuilder.CreateIndex(
                name: "IX_tblRedesSociais_PalestranteId",
                table: "tblRedesSociais",
                column: "PalestranteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblLotes");

            migrationBuilder.DropTable(
                name: "tblPalestrantesEventos");

            migrationBuilder.DropTable(
                name: "tblRedesSociais");

            migrationBuilder.DropTable(
                name: "tblEventos");

            migrationBuilder.DropTable(
                name: "tblPalestrantes");
        }
    }
}
