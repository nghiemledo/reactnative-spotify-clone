using SPO.Application.DataTransferObjects.Request.PodcastShow;
using SPO.Domain.Entities;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories
{
    public interface IPodcastShowRepository
    {
        Task<PodcastShow> AddAsync(CreatePodcastShowRequest vm);
        Task<PodcastShow> UpdateAsync(UpdatePodcastShowRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<PodcastShow?> GetByIdAsync(string id);
        Task<IEnumerable<PodcastShow>> GetAllAsync();
    }

    public class PodcastShowRepository : IPodcastShowRepository
    {
        private readonly IDapperBase _db;
        public PodcastShowRepository(IDapperBase db) { _db = db; }

        public async Task<PodcastShow> AddAsync(CreatePodcastShowRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Title,
                    vm.Creator,
                    vm.Description,
                    vm.CoverImage,
                    vm.CategoryId,
                    Id = Guid.NewGuid().ToString()
                };

                await _db.SaveData("[SP_SPO_InsertPodcastShow]", parameters);

                var newPodcastShow = await _db.GetData<PodcastShow, dynamic>(
                    "[SP_SPO_GetPodcastShowById]",
                    new { Id = parameters.Id }
                );

                return newPodcastShow.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying insert PodcastShow", ex);
            }
        }

        public async Task<PodcastShow> UpdateAsync(UpdatePodcastShowRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Id,
                    vm.Title,
                    vm.Creator,
                    vm.Description,
                    vm.CoverImage,
                    vm.CategoryId
                };

                await _db.SaveData("[SP_SPO_UpdatePodcastShow]", parameters);
                var updatedExamPart = await _db.GetData<PodcastShow, dynamic>(
                    "[SP_SPO_GetPodcastShowById]",
                    new { Id = vm.Id }
                );

                return updatedExamPart.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying update PodcastShow", ex);
            }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_SPO_DeletePodcastShow", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<PodcastShow?> GetByIdAsync(string id)
        {
            IEnumerable<PodcastShow> result = await _db.GetData<PodcastShow, dynamic>("[SP_SPO_GetPodcastShowById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<PodcastShow>> GetAllAsync()
        {
            string query = "[SP_SPO_GetAllPodcastShows]";
            return await _db.GetData<PodcastShow, dynamic>(query, new { });
        }
    }
}
