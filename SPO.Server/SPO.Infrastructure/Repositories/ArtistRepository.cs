using SPO.Application.DataTransferObjects.Request.Artist;
using SPO.Domain.Entities;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories
{
    public interface IArtistRepository
    {
        Task<Artist> AddAsync(CreateArtistRequest vm);
        Task<Artist> UpdateAsync(UpdateArtistRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<Artist?> GetByIdAsync(string id);
        Task<IEnumerable<Artist>> GetAllAsync();
    }

    public class ArtistRepository : IArtistRepository
    {
        private readonly IDapperBase _db;
        public ArtistRepository(IDapperBase db) { _db = db; }

        public async Task<Artist> AddAsync(CreateArtistRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Name,
                    vm.Bio,
                    vm.UrlAvatar,
                    Id = Guid.NewGuid().ToString()
                };

                await _db.SaveData("[SP_SPO_InsertArtist]", parameters);

                var newArtist = await _db.GetData<Artist, dynamic>(
                    "[SP_SPO_GetArtistById]",
                    new { Id = parameters.Id }
                );

                return newArtist.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying insert Artist", ex);
            }
        }

        public async Task<Artist> UpdateAsync(UpdateArtistRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Id,
                    vm.Name,
                    vm.Bio,
                    vm.UrlAvatar,
                };

                await _db.SaveData("[SP_SPO_UpdateArtist]", parameters);
                var updatedExamPart = await _db.GetData<Artist, dynamic>(
                    "[SP_SPO_GetArtistById]",
                    new { Id = vm.Id }
                );

                return updatedExamPart.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying update Artist", ex);
            }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_SPO_DeleteArtist", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<Artist?> GetByIdAsync(string id)
        {
            IEnumerable<Artist> result = await _db.GetData<Artist, dynamic>("[SP_SPO_GetArtistById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Artist>> GetAllAsync()
        {
            string query = "[SP_SPO_GetAllArtists]";
            return await _db.GetData<Artist, dynamic>(query, new { });
        }
    }
}
