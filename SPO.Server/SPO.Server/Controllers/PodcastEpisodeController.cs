using Microsoft.AspNetCore.Mvc;
using SPO.Application.DataTransferObjects.Request.PodcastEpisode;
using SPO.Domain.Entities;
using SPO.Domain.Wrappers;
using SPO.Infrastructure.Repositories;

namespace SPO.Server.Controllers
{
    [Route("api/podcastEpisode")]
    [ApiController]
    public class PodcastEpisodeController : ControllerBase
    {
        private readonly IPodcastEpisodeRepository _repository;

        public PodcastEpisodeController(IPodcastEpisodeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> PodcastEpisodesGet()
        {
            var result = await _repository.GetAllAsync();
            return Ok(await Result<List<PodcastEpisode>>.SuccessAsync(result.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> PodcastEpisodeGet(string id)
        {
            var query = await _repository.GetByIdAsync(id);
            if (query is null) return BadRequest(await Result<PodcastEpisode>.FailAsync("PodcastEpisode not found."));

            return Ok(await Result<PodcastEpisode>.SuccessAsync(query));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> PodcastEpisodePost([FromBody] CreatePodcastEpisodeRequest request)
        {
            var newPodcastEpisode = await _repository.AddAsync(request);
            return Ok(await Result<PodcastEpisode>.SuccessAsync(newPodcastEpisode));
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> PodcastEpisodePut([FromBody] UpdatePodcastEpisodeRequest request)
        {
            var item = await _repository.GetByIdAsync(request.Id);
            if (item is null) return BadRequest(await Result<PodcastEpisode>.FailAsync("PodcastEpisode not found."));

            var updatedPodcastEpisode = await _repository.UpdateAsync(request);
            return Ok(await Result<PodcastEpisode>.SuccessAsync(updatedPodcastEpisode));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> PodcastEpisodeDelete(string id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item is null) return BadRequest(await Result<PodcastEpisode>.FailAsync("PodcastEpisode not found."));

            await _repository.DeleteAsync(id);
            return Ok(await Result<PodcastEpisode>.SuccessAsync());
        }
    }
}
