using Bootcamp.WebAPI.Data.Abstractions;
using Bootcamp.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootcamp.WebAPI.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController : Controller
    {
        private readonly ILogger<GenresController> log;
        private readonly IResponseTransformer transformer;
        private readonly IRepository<Genre> repo;
        public GenresController(ILogger<GenresController> log, IResponseTransformer transformer, IRepository<Genre> repo)
        {
            this.log = log;
            this.transformer = transformer;
            this.repo = repo;
        }

        [HttpGet("")]
        public IActionResult Get() {
            return Ok(this.repo.GetAll());
        }
    }
}
