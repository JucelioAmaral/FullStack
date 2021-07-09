using System.Threading.Tasks;
using ProEventos.Application.Dtos;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
    public interface IEventosService
    {
        Task<EventoDto> AddEventos(EventoDto model);
        Task<EventoDto> UpdateEventos(int eventoId, EventoDto model);
        Task<bool> DeleteEvento(int eventoId);

        Task<EventoDto[]> GetAllEventosAsync(bool includePalestrante = false);
        Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrante = false);
        Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrante = false);
    }
}