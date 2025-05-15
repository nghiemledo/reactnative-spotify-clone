using Microsoft.AspNetCore.Mvc;
using SPO.Application.DataTransferObjects.Request.PodcastCategory;
using SPO.Domain.Entities;
using SPO.Domain.Wrappers;
using SPO.Infrastructure.Repositories;

namespace SPO.Server.Controllers
{
    [Route("api/podcastCategory")]
    [ApiController]
    public class PodcastCategoryController : ControllerBase
    {
        private readonly IPodcastCategoryRepository _repository;

        public PodcastCategoryController(IPodcastCategoryRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> PodcastCategoriesGet()
        {
            var result = await _repository.GetAllAsync();
            return Ok(await Result<List<PodcastCategory>>.SuccessAsync(result.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> PodcastCategoryGet(string id)
        {
            var query = await _repository.GetByIdAsync(id);
            if (query is null) return BadRequest(await Result<PodcastCategory>.FailAsync("PodcastCategory not found."));

            return Ok(await Result<PodcastCategory>.SuccessAsync(query));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> PodcastCategoryPost([FromBody] CreatePodcastCategoryRequest request)
        {
            var newPodcastCategory = await _repository.AddAsync(request);
            return Ok(await Result<PodcastCategory>.SuccessAsync(newPodcastCategory));
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> PodcastCategoryPut([FromBody] UpdatePodcastCategoryRequest request)
        {
            var item = await _repository.GetByIdAsync(request.Id);
            if (item is null) return BadRequest(await Result<PodcastCategory>.FailAsync("PodcastCategory not found."));

            var updatedPodcastCategory = await _repository.UpdateAsync(request);
            return Ok(await Result<PodcastCategory>.SuccessAsync(updatedPodcastCategory));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> PodcastCategoryDelete(string id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item is null) return BadRequest(await Result<PodcastCategory>.FailAsync("PodcastCategory not found."));

            await _repository.DeleteAsync(id);
            return Ok(await Result<PodcastCategory>.SuccessAsync());
        }
    }
}
