using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.Domain;
using ProEventos.Persistence;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly ProEventosContext _context;
        public EventosController(ProEventosContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _context.tblEventos;
        }

        [HttpGet("{id}")]
        public Evento GetById(int id)
        {
            return _context.tblEventos.FirstOrDefault(
                evento => evento.Id == id
            );
        }


        [HttpPost]
        public String Post()
        {
            return "Exemplo de Post";
        }

        [HttpPut("{id}")]
        public String Put(int id)
        {
            return $"Exemplo de Put com id ={id}";
        }

        [HttpDelete("{id}")]
        public String Delete(int id)
        {
            return $"Exemplo de Delete com id ={id}";
        }
    }
}
