using Microsoft.AspNetCore.Mvc;
using SPO.Application.DataTransferObjects.Request.Artist;
using SPO.Domain.Entities;
using SPO.Domain.Wrappers;
using SPO.Infrastructure.Repositories;

namespace SPO.Server.Controllers
{
    [Route("api/artist")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly IArtistRepository _repository;

        public ArtistController(IArtistRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> ArtistsGet()
        {
            var result = await _repository.GetAllAsync();
            return Ok(await Result<List<Artist>>.SuccessAsync(result.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> ArtistGet(string id)
        {
            var query = await _repository.GetByIdAsync(id);
            if (query is null) return BadRequest(await Result<Artist>.FailAsync("Artist not found."));

            return Ok(await Result<Artist>.SuccessAsync(query));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> ArtistPost([FromBody] CreateArtistRequest request)
        {
            var newArtist = await _repository.AddAsync(request);
            return Ok(await Result<Artist>.SuccessAsync(newArtist));
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> ArtistPut([FromBody] UpdateArtistRequest request)
        {
            var item = await _repository.GetByIdAsync(request.Id);
            if (item is null) return BadRequest(await Result<Artist>.FailAsync("Artist not found."));

            var updatedArtist = await _repository.UpdateAsync(request);
            return Ok(await Result<Artist>.SuccessAsync(updatedArtist));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> ArtistDelete(string id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item is null) return BadRequest(await Result<Artist>.FailAsync("Artist not found."));

            await _repository.DeleteAsync(id);
            return Ok(await Result<Artist>.SuccessAsync());
        }
    }
}
