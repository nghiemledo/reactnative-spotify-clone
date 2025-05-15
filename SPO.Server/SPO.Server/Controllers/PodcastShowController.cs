using Microsoft.AspNetCore.Mvc;
using SPO.Application.DataTransferObjects.Request.PodcastShow;
using SPO.Domain.Entities;
using SPO.Domain.Wrappers;
using SPO.Infrastructure.Repositories;

namespace SPO.Server.Controllers
{
    [Route("api/podcastShow")]
    [ApiController]
    public class PodcastShowController : ControllerBase
    {
        private readonly IPodcastShowRepository _repository;

        public PodcastShowController(IPodcastShowRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> PodcastCategoriesGet()
        {
            var result = await _repository.GetAllAsync();
            return Ok(await Result<List<PodcastShow>>.SuccessAsync(result.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> PodcastShowGet(string id)
        {
            var query = await _repository.GetByIdAsync(id);
            if (query is null) return BadRequest(await Result<PodcastShow>.FailAsync("PodcastShow not found."));

            return Ok(await Result<PodcastShow>.SuccessAsync(query));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> PodcastShowPost([FromBody] CreatePodcastShowRequest request)
        {
            var newPodcastShow = await _repository.AddAsync(request);
            return Ok(await Result<PodcastShow>.SuccessAsync(newPodcastShow));
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> PodcastShowPut([FromBody] UpdatePodcastShowRequest request)
        {
            var item = await _repository.GetByIdAsync(request.Id);
            if (item is null) return BadRequest(await Result<PodcastShow>.FailAsync("PodcastShow not found."));

            var updatedPodcastShow = await _repository.UpdateAsync(request);
            return Ok(await Result<PodcastShow>.SuccessAsync(updatedPodcastShow));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> PodcastShowDelete(string id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item is null) return BadRequest(await Result<PodcastShow>.FailAsync("PodcastShow not found."));

            await _repository.DeleteAsync(id);
            return Ok(await Result<PodcastShow>.SuccessAsync());
        }
    }
}
