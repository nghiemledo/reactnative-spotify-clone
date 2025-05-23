using SPO.Application.DataTransferObjects.Request.Album;
using SPO.Domain.Entities;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories
{
    public interface IAlbumRepository
    {
        Task<Album> AddAsync(CreateAlbumRequest vm);
        Task<Album> UpdateAsync(UpdateAlbumRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<Album?> GetByIdAsync(string id);
        Task<IEnumerable<Album>> GetAllAsync();
    }

    public class AlbumRepository : IAlbumRepository
    {
        private readonly IDapperBase _db;
        public AlbumRepository(IDapperBase db) { _db = db; }

        public async Task<Album> AddAsync(CreateAlbumRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Title,
                    vm.CoverImage,
                    vm.GenreId,
                    vm.ArtistId,
                    Id = Guid.NewGuid().ToString()
                };

                await _db.SaveData("[SP_SPO_InsertAlbum]", parameters);

                var newAlbum = await _db.GetData<Album, dynamic>(
                    "[SP_SPO_GetAlbumById]",
                    new { Id = parameters.Id }
                );

                return newAlbum.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying insert Album", ex);
            }
        }

        public async Task<Album> UpdateAsync(UpdateAlbumRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Id,
                    vm.Title,
                    vm.CoverImage,
                    vm.GenreId,
                    vm.ArtistId
                };

                await _db.SaveData("[SP_SPO_UpdateAlbum]", parameters);
                var updatedExamPart = await _db.GetData<Album, dynamic>(
                    "[SP_SPO_GetAlbumById]",
                    new { Id = vm.Id }
                );

                return updatedExamPart.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying update Album", ex);
            }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_SPO_DeleteAlbum", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<Album?> GetByIdAsync(string id)
        {
            IEnumerable<Album> result = await _db.GetData<Album, dynamic>("[SP_SPO_GetAlbumById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Album>> GetAllAsync()
        {
            string query = "[SP_SPO_GetAllAlbums]";
            return await _db.GetData<Album, dynamic>(query, new { });
        }
    }
}
