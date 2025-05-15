using Microsoft.AspNetCore.Mvc;
using SPO.Application.DataTransferObjects.Request.Playlist;
using SPO.Domain.Entities;
using SPO.Domain.Wrappers;
using SPO.Infrastructure.Repositories;

namespace SPO.Server.Controllers
{
    [Route("api/playlist")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly IPlaylistRepository _repository;

        public PlaylistController(IPlaylistRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> PlaylistsGet()
        {
            var result = await _repository.GetAllAsync();
            return Ok(await Result<List<Playlist>>.SuccessAsync(result.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> PlaylistGet(string id)
        {
            var query = await _repository.GetByIdAsync(id);
            if (query is null) return BadRequest(await Result<Playlist>.FailAsync("Playlist not found."));

            return Ok(await Result<Playlist>.SuccessAsync(query));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> PlaylistPost([FromBody] CreatePlaylistRequest request)
        {
            var newPlaylist = await _repository.AddAsync(request);
            return Ok(await Result<Playlist>.SuccessAsync(newPlaylist));
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> PlaylistPut([FromBody] UpdatePlaylistRequest request)
        {
            var item = await _repository.GetByIdAsync(request.Id);
            if (item is null) return BadRequest(await Result<Playlist>.FailAsync("Playlist not found."));

            var updatedPlaylist = await _repository.UpdateAsync(request);
            return Ok(await Result<Playlist>.SuccessAsync(updatedPlaylist));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> PlaylistDelete(string id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item is null) return BadRequest(await Result<Playlist>.FailAsync("Playlist not found."));

            await _repository.DeleteAsync(id);
            return Ok(await Result<Playlist>.SuccessAsync());
        }
    }
}
