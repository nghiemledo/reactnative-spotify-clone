using Microsoft.AspNetCore.Mvc;
using SPO.Application.DataTransferObjects.Request.Album;
using SPO.Domain.Entities;
using SPO.Domain.Wrappers;
using SPO.Infrastructure.Repositories;

namespace SPO.Server.Controllers
{
    [Route("api/Album")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumRepository _repository;

        public AlbumController(IAlbumRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> AlbumsGet()
        {
            var result = await _repository.GetAllAsync();
            return Ok(await Result<List<Album>>.SuccessAsync(result.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> AlbumGet(string id)
        {
            var query = await _repository.GetByIdAsync(id);
            if (query is null) return BadRequest(await Result<Album>.FailAsync("Album not found."));

            return Ok(await Result<Album>.SuccessAsync(query));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> AlbumPost([FromBody] CreateAlbumRequest request)
        {
            var newAlbum = await _repository.AddAsync(request);
            return Ok(await Result<Album>.SuccessAsync(newAlbum));
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> AlbumPut([FromBody] UpdateAlbumRequest request)
        {
            var item = await _repository.GetByIdAsync(request.Id);
            if (item is null) return BadRequest(await Result<Album>.FailAsync("Album not found."));

            var updatedAlbum = await _repository.UpdateAsync(request);
            return Ok(await Result<Album>.SuccessAsync(updatedAlbum));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> AlbumDelete(string id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item is null) return BadRequest(await Result<Album>.FailAsync("Album not found."));

            await _repository.DeleteAsync(id);
            return Ok(await Result<Album>.SuccessAsync());
        }
    }
}
