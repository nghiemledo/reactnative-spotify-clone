using Microsoft.AspNetCore.Mvc;
using SPO.Application.DataTransferObjects.Request.Genre;
using SPO.Domain.Entities;
using SPO.Domain.Wrappers;
using SPO.Infrastructure.Repositories;

namespace SPO.Server.Controllers
{
    [Route("api/genre")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IGenreRepository _repository;

        public GenreController(IGenreRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> GenresGet()
        {
            var result = await _repository.GetAllAsync();
            return Ok(await Result<List<Genre>>.SuccessAsync(result.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GenreGet(string id)
        {
            var query = await _repository.GetByIdAsync(id);
            if (query is null) return BadRequest(await Result<Genre>.FailAsync("Genre not found."));

            return Ok(await Result<Genre>.SuccessAsync(query));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> GenrePost([FromBody] CreateGenreRequest request)
        {
            var newGenre = await _repository.AddAsync(request);
            return Ok(await Result<Genre>.SuccessAsync(newGenre));
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> GenrePut([FromBody] UpdateGenreRequest request)
        {
            var item = await _repository.GetByIdAsync(request.Id);
            if (item is null) return BadRequest(await Result<Genre>.FailAsync("Genre not found."));

            var updatedGenre = await _repository.UpdateAsync(request);
            return Ok(await Result<Genre>.SuccessAsync(updatedGenre));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> GenreDelete(string id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item is null) return BadRequest(await Result<Genre>.FailAsync("Genre not found."));

            await _repository.DeleteAsync(id);
            return Ok(await Result<Genre>.SuccessAsync());
        }
    }
}
