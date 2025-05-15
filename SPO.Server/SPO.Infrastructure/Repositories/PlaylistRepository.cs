using SPO.Application.DataTransferObjects.Request.Playlist;
using SPO.Domain.Entities;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories
{
    public interface IPlaylistRepository
    {
        Task<Playlist> AddAsync(CreatePlaylistRequest vm);
        Task<Playlist> UpdateAsync(UpdatePlaylistRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<Playlist?> GetByIdAsync(string id);
        Task<IEnumerable<Playlist>> GetAllAsync();
    }

    public class PlaylistRepository : IPlaylistRepository
    {
        private readonly IDapperBase _db;
        public PlaylistRepository(IDapperBase db) { _db = db; }

        public async Task<Playlist> AddAsync(CreatePlaylistRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Title,
                    vm.Description,
                    vm.CoverImage,
                    vm.UserId,
                    Id = Guid.NewGuid().ToString()
                };

                await _db.SaveData("[SP_SPO_InsertPlaylist]", parameters);

                var newPlaylist = await _db.GetData<Playlist, dynamic>(
                    "[SP_SPO_GetPlaylistById]",
                    new { Id = parameters.Id }
                );

                return newPlaylist.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying insert Playlist", ex);
            }
        }

        public async Task<Playlist> UpdateAsync(UpdatePlaylistRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Id,
                    vm.Title,
                    vm.Description,
                    vm.CoverImage,
                    vm.UserId
                };

                await _db.SaveData("[SP_SPO_UpdatePlaylist]", parameters);
                var updatedExamPart = await _db.GetData<Playlist, dynamic>(
                    "[SP_SPO_GetPlaylistById]",
                    new { Id = vm.Id }
                );

                return updatedExamPart.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying update Playlist", ex);
            }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_SPO_DeletePlaylist", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<Playlist?> GetByIdAsync(string id)
        {
            IEnumerable<Playlist> result = await _db.GetData<Playlist, dynamic>("[SP_SPO_GetPlaylistById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Playlist>> GetAllAsync()
        {
            string query = "[SP_SPO_GetAllPlaylists]";
            return await _db.GetData<Playlist, dynamic>(query, new { });
        }
    }
}
