using SPO.Application.DataTransferObjects.Request.PodcastCategory;
using SPO.Domain.Entities;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories
{
    public interface IPodcastCategoryRepository
    {
        Task<PodcastCategory> AddAsync(CreatePodcastCategoryRequest vm);
        Task<PodcastCategory> UpdateAsync(UpdatePodcastCategoryRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<PodcastCategory?> GetByIdAsync(string id);
        Task<IEnumerable<PodcastCategory>> GetAllAsync();
    }

    public class PodcastCategoryRepository : IPodcastCategoryRepository
    {
        private readonly IDapperBase _db;
        public PodcastCategoryRepository(IDapperBase db) { _db = db; }

        public async Task<PodcastCategory> AddAsync(CreatePodcastCategoryRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Name,
                    vm.Description,
                    Id = Guid.NewGuid().ToString()
                };

                await _db.SaveData("[SP_SPO_InsertPodcastCategory]", parameters);

                var newPodcastCategory = await _db.GetData<PodcastCategory, dynamic>(
                    "[SP_SPO_GetPodcastCategoryById]",
                    new { Id = parameters.Id }
                );

                return newPodcastCategory.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying insert PodcastCategory", ex);
            }
        }

        public async Task<PodcastCategory> UpdateAsync(UpdatePodcastCategoryRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Id,
                    vm.Name,
                    vm.Description
                };

                await _db.SaveData("[SP_SPO_UpdatePodcastCategory]", parameters);
                var updatedExamPart = await _db.GetData<PodcastCategory, dynamic>(
                    "[SP_SPO_GetPodcastCategoryById]",
                    new { Id = vm.Id }
                );

                return updatedExamPart.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying update PodcastCategory", ex);
            }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_SPO_DeletePodcastCategory", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<PodcastCategory?> GetByIdAsync(string id)
        {
            IEnumerable<PodcastCategory> result = await _db.GetData<PodcastCategory, dynamic>("[SP_SPO_GetPodcastCategoryById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<PodcastCategory>> GetAllAsync()
        {
            string query = "[SP_SPO_GetAllPodcastCategories]";
            return await _db.GetData<PodcastCategory, dynamic>(query, new { });
        }
    }
}
