using Microsoft.AspNetCore.Mvc;
using SPO.Application.DataTransferObjects.Request.PlaylistItem;
using SPO.Domain.Entities;
using SPO.Domain.Wrappers;
using SPO.Infrastructure.Repositories;

namespace SPO.Server.Controllers
{
    [Route("api/playlistItem")]
    [ApiController]
    public class PlaylistItemController : ControllerBase
    {
        private readonly IPlaylistItemRepository _repository;

        public PlaylistItemController(IPlaylistItemRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> PlaylistItemsGet()
        {
            var result = await _repository.GetAllAsync();
            return Ok(await Result<List<PlaylistItem>>.SuccessAsync(result.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> PlaylistItemGet(string id)
        {
            var query = await _repository.GetByIdAsync(id);
            if (query is null) return BadRequest(await Result<PlaylistItem>.FailAsync("PlaylistItem not found."));

            return Ok(await Result<PlaylistItem>.SuccessAsync(query));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> PlaylistItemPost([FromBody] CreatePlaylistItemRequest request)
        {
            var newPlaylistItem = await _repository.AddAsync(request);
            return Ok(await Result<PlaylistItem>.SuccessAsync(newPlaylistItem));
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> PlaylistItemPut([FromBody] UpdatePlaylistItemRequest request)
        {
            var item = await _repository.GetByIdAsync(request.Id);
            if (item is null) return BadRequest(await Result<PlaylistItem>.FailAsync("PlaylistItem not found."));

            var updatedPlaylistItem = await _repository.UpdateAsync(request);
            return Ok(await Result<PlaylistItem>.SuccessAsync(updatedPlaylistItem));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> PlaylistItemDelete(string id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item is null) return BadRequest(await Result<PlaylistItem>.FailAsync("PlaylistItem not found."));

            await _repository.DeleteAsync(id);
            return Ok(await Result<PlaylistItem>.SuccessAsync());
        }
    }
}
