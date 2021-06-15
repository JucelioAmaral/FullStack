﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {

        public IEnumerable<Evento> _evento = new Evento[]{
                new Evento(){
                EventoId = 1,
                Tema = "Angular 11 e .NET 5",
                Local = "Belo Horizonte",
                QtdPessoas = 250,
                Lote = "1º lote",
                DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
                ImagemURL = "foto .png"
                },
                new Evento(){
                EventoId = 2,
                Tema = "Angular 11 e suas novidades",
                Local = "São Paulo",
                QtdPessoas = 350,
                Lote = "2º lote",
                DataEvento = DateTime.Now.AddDays(3).ToString("dd/MM/yyyy"),
                ImagemURL = "foto 1.png"
                }
            };                

        public EventoController()
        {

        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {            
            return _evento;       
        }

                [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        {            
            return _evento.Where(evento => evento.EventoId == id);       
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
