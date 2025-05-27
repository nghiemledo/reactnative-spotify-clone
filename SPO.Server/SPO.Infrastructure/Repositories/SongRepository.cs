using SPO.Application.DataTransferObjects.Request.Song;
using SPO.Domain.Entities;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories
{
    public interface ISongRepository
    {
        Task<Song> AddAsync(CreateSongRequest vm);
        Task<Song> UpdateAsync(UpdateSongRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<Song?> GetByIdAsync(string id);
        Task<IEnumerable<Song>> GetAllAsync();
        Task<IEnumerable<Song>> GetAllTrendingAsync();
    }

    public class SongRepository : ISongRepository
    {
        private readonly IDapperBase _db;
        public SongRepository(IDapperBase db) { _db = db; }

        public async Task<Song> AddAsync(CreateSongRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Title,
                    vm.CoverImage,
                    vm.GenreId,
                    vm.Duration,
                    vm.ArtistId,
                    vm.AlbumId,
                    vm.AudioUrl,
                    Id = Guid.NewGuid().ToString()
                };

                await _db.SaveData("[SP_SPO_InsertSong]", parameters);

                var newSong = await _db.GetData<Song, dynamic>(
                    "[SP_SPO_GetSongById]",
                    new { Id = parameters.Id }
                );

                return newSong.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying insert Song", ex);
            }
        }

        public async Task<Song> UpdateAsync(UpdateSongRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Id,
                    vm.Title,
                    vm.CoverImage,
                    vm.GenreId,
                    vm.Duration,
                    vm.ArtistId,
                    vm.AlbumId,
                    vm.AudioUrl
                };

                await _db.SaveData("[SP_SPO_UpdateSong]", parameters);
                var updatedExamPart = await _db.GetData<Song, dynamic>(
                    "[SP_SPO_GetSongById]",
                    new { Id = vm.Id }
                );

                return updatedExamPart.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying update Song", ex);
            }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_SPO_DeleteSong", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<Song?> GetByIdAsync(string id)
        {
            IEnumerable<Song> result = await _db.GetData<Song, dynamic>("[SP_SPO_GetSongById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Song>> GetAllAsync()
        {
            string query = "[SP_SPO_GetAllSongs]";
            return await _db.GetData<Song, dynamic>(query, new { });
        }

        public async Task<IEnumerable<Song>> GetAllTrendingAsync()
        {
            string query = "[SP_SPO_GetAllTrendingSongs]";
            return await _db.GetData<Song, dynamic>(query, new { });
        }
    }
}
