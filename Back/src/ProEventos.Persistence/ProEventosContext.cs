using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;

namespace ProEventos.Persistence
{
    public class ProEventosContext : DbContext
    {
        public ProEventosContext(DbContextOptions<ProEventosContext> options) : base(options){ }
        public DbSet<Evento> tblEventos { get; set; }
        public DbSet<Lote> tblLotes { get; set; }
        public DbSet<Palestrante> tblPalestrantes { get; set; }
        public DbSet<PalestranteEvento> tblPalestrantesEventos { get; set; }
        public DbSet<RedeSocial> tblRedesSociais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PalestranteEvento>()
            .HasKey(PE => new {PE.EventoId, PE.PalestranteId});
        }
    }
}