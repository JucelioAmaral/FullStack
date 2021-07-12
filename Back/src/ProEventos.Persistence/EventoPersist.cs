using System.Linq;
using Microsoft.EntityFrameworkCore;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Contextos;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence
{
    public class EventosPersist : IEventoPersist
    {
        private readonly ProEventosContext _context;

        public EventosPersist(ProEventosContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrante = false)
        {
            IQueryable<Evento> query = _context.tblEventos //LE-SE: Para cada evento na tabela Evento, inclui os lotes e as redes sociais.
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);

            if(includePalestrante)// se "includePalestrante" for verdadeiro, inclui também, na query, o palestranteEvento e inclui o palestrante.
            {
                query = query
                .Include(pe => pe.PalestrantesEventos)// Include = Inclui. Ou seja, são SELECT's.
                .ThenInclude(pe => pe.Palestrante);
            }

            query = query.AsNoTracking().OrderBy(e => e.Id);// Ordenado por Id.
            return await query.ToArrayAsync();
        }
        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrante = false)
        {
            IQueryable<Evento> query = _context.tblEventos
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);

            if(includePalestrante)
            {
                query = query
                .Include(pe => pe.PalestrantesEventos)
                .ThenInclude(pe => pe.Palestrante);
            }

            query = query.AsNoTracking().OrderBy(e => e.Id)
                                        .Where(e => e.Tema.ToLower().Contains(tema.ToLower()));
            return await query.ToArrayAsync();
        }
        public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrante = false)
        {
            IQueryable<Evento> query = _context.tblEventos
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);

            if(includePalestrante)
            {
                query = query
                .Include(pe => pe.PalestrantesEventos)
                .ThenInclude(pe => pe.Palestrante);
            }

            query = query.AsNoTracking().OrderBy(e => e.Id)
                                        .Where(e => e.Id == eventoId);
            return await query.FirstOrDefaultAsync();
        }       
    }
}