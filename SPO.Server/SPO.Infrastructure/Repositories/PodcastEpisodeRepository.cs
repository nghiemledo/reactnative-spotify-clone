using SPO.Application.DataTransferObjects.Request.PodcastEpisode;
using SPO.Domain.Entities;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories
{
    public interface IPodcastEpisodeRepository
    {
        Task<PodcastEpisode> AddAsync(CreatePodcastEpisodeRequest vm);
        Task<PodcastEpisode> UpdateAsync(UpdatePodcastEpisodeRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<PodcastEpisode?> GetByIdAsync(string id);
        Task<IEnumerable<PodcastEpisode>> GetAllAsync();
    }

    public class PodcastEpisodeRepository : IPodcastEpisodeRepository
    {
        private readonly IDapperBase _db;
        public PodcastEpisodeRepository(IDapperBase db) { _db = db; }

        public async Task<PodcastEpisode> AddAsync(CreatePodcastEpisodeRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Title,
                    vm.Description,
                    vm.Duration,
                    vm.AudioUrl,
                    vm.ShowId,
                    Id = Guid.NewGuid().ToString()
                };

                await _db.SaveData("[SP_SPO_InsertPodcastEpisode]", parameters);

                var newPodcastEpisode = await _db.GetData<PodcastEpisode, dynamic>(
                    "[SP_SPO_GetPodcastEpisodeById]",
                    new { Id = parameters.Id }
                );

                return newPodcastEpisode.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying insert PodcastEpisode", ex);
            }
        }

        public async Task<PodcastEpisode> UpdateAsync(UpdatePodcastEpisodeRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Id,
                    vm.Title,
                    vm.Description,
                    vm.Duration,
                    vm.AudioUrl,
                    vm.ShowId
                };

                await _db.SaveData("[SP_SPO_UpdatePodcastEpisode]", parameters);
                var updatedExamPart = await _db.GetData<PodcastEpisode, dynamic>(
                    "[SP_SPO_GetPodcastEpisodeById]",
                    new { Id = vm.Id }
                );

                return updatedExamPart.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying update PodcastEpisode", ex);
            }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_SPO_DeletePodcastEpisode", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<PodcastEpisode?> GetByIdAsync(string id)
        {
            IEnumerable<PodcastEpisode> result = await _db.GetData<PodcastEpisode, dynamic>("[SP_SPO_GetPodcastEpisodeById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<PodcastEpisode>> GetAllAsync()
        {
            string query = "[SP_SPO_GetAllPodcastEpisodes]";
            return await _db.GetData<PodcastEpisode, dynamic>(query, new { });
        }
    }
}
