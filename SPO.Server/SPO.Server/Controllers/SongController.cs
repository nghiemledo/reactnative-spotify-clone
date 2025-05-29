using Microsoft.AspNetCore.Mvc;
using SPO.Application.DataTransferObjects.Request.Song;
using SPO.Domain.Entities;
using SPO.Domain.Wrappers;
using SPO.Infrastructure.Repositories;

namespace SPO.Server.Controllers
{
    [Route("api/song")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly ISongRepository _repository;

        public SongController(ISongRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> SongsGet()
        {
            var result = await _repository.GetAllAsync();
            return Ok(await Result<List<Song>>.SuccessAsync(result.ToList()));
        }

        [HttpGet]
        [Route("trending")]
        public async Task<ActionResult> TrendingSongsGet()
        {
            var result = await _repository.GetAllTrendingAsync();
            return Ok(await Result<List<Song>>.SuccessAsync(result.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> SongGet(string id)
        {
            var query = await _repository.GetByIdAsync(id);
            if (query is null) return BadRequest(await Result<Song>.FailAsync("Song not found."));

            return Ok(await Result<Song>.SuccessAsync(query));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> SongPost([FromBody] CreateSongRequest request)
        {
            var newSong = await _repository.AddAsync(request);
            return Ok(await Result<Song>.SuccessAsync(newSong));
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> SongPut([FromBody] UpdateSongRequest request)
        {
            var item = await _repository.GetByIdAsync(request.Id);
            if (item is null) return BadRequest(await Result<Song>.FailAsync("Song not found."));

            var updatedSong = await _repository.UpdateAsync(request);
            return Ok(await Result<Song>.SuccessAsync(updatedSong));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> SongDelete(string id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item is null) return BadRequest(await Result<Song>.FailAsync("Song not found."));

            await _repository.DeleteAsync(id);
            return Ok(await Result<Song>.SuccessAsync());
        }
    }
}
