using SPO.Application.DataTransferObjects.Request.PlaylistItem;
using SPO.Domain.Entities;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories
{
    public interface IPlaylistItemRepository
    {
        Task<PlaylistItem> AddAsync(CreatePlaylistItemRequest vm);
        Task<PlaylistItem> UpdateAsync(UpdatePlaylistItemRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<PlaylistItem?> GetByIdAsync(string id);
        Task<IEnumerable<PlaylistItem>> GetAllAsync();
    }

    public class PlaylistItemRepository : IPlaylistItemRepository
    {
        private readonly IDapperBase _db;
        public PlaylistItemRepository(IDapperBase db) { _db = db; }

        public async Task<PlaylistItem> AddAsync(CreatePlaylistItemRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.PlaylistId,
                    vm.SongId,
                    vm.EpisodeId,
                    Id = Guid.NewGuid().ToString()
                };

                await _db.SaveData("[SP_SPO_InsertPlaylistItem]", parameters);

                var newPlaylistItem = await _db.GetData<PlaylistItem, dynamic>(
                    "[SP_SPO_GetPlaylistItemById]",
                    new { Id = parameters.Id }
                );

                return newPlaylistItem.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying insert PlaylistItem", ex);
            }
        }

        public async Task<PlaylistItem> UpdateAsync(UpdatePlaylistItemRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Id,
                    vm.PlaylistId,
                    vm.SongId,
                    vm.EpisodeId
                };

                await _db.SaveData("[SP_SPO_UpdatePlaylistItem]", parameters);
                var updatedExamPart = await _db.GetData<PlaylistItem, dynamic>(
                    "[SP_SPO_GetPlaylistItemById]",
                    new { Id = vm.Id }
                );

                return updatedExamPart.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying update PlaylistItem", ex);
            }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_SPO_DeletePlaylistItem", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<PlaylistItem?> GetByIdAsync(string id)
        {
            IEnumerable<PlaylistItem> result = await _db.GetData<PlaylistItem, dynamic>("[SP_SPO_GetPlaylistItemById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<PlaylistItem>> GetAllAsync()
        {
            string query = "[SP_SPO_GetAllPlaylistItems]";
            return await _db.GetData<PlaylistItem, dynamic>(query, new { });
        }
    }
}
