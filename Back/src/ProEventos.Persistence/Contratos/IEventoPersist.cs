using System.Threading.Tasks;
using ProEventos.Domain; 

namespace ProEventos.Persistence.Contratos
{
    public interface IEventoPersist
    { 
        //EVENTOS
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrante = false);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrante = false);
        Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrante = false);
    }
}