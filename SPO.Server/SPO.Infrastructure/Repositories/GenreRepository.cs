using SPO.Application.DataTransferObjects.Request.Genre;
using SPO.Domain.Entities;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories
{
    public interface IGenreRepository
    {
        Task<Genre> AddAsync(CreateGenreRequest vm);
        Task<Genre> UpdateAsync(UpdateGenreRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<Genre?> GetByIdAsync(string id);
        Task<IEnumerable<Genre>> GetAllAsync();
    }

    public class GenreRepository : IGenreRepository
    {
        private readonly IDapperBase _db;
        public GenreRepository(IDapperBase db) { _db = db; }

        public async Task<Genre> AddAsync(CreateGenreRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Name,
                    vm.Description,
                    Id = Guid.NewGuid().ToString()
                };

                await _db.SaveData("[SP_SPO_InsertGenre]", parameters);

                var newGenre = await _db.GetData<Genre, dynamic>(
                    "[SP_SPO_GetGenreById]",
                    new { Id = parameters.Id }
                );

                return newGenre.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying insert Genre", ex);
            }
        }

        public async Task<Genre> UpdateAsync(UpdateGenreRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Id,
                    vm.Name,
                    vm.Description,
                };

                await _db.SaveData("[SP_SPO_UpdateGenre]", parameters);
                var updatedExamPart = await _db.GetData<Genre, dynamic>(
                    "[SP_SPO_GetGenreById]",
                    new { Id = vm.Id }
                );

                return updatedExamPart.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying update Genre", ex);
            }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_SPO_DeleteGenre", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<Genre?> GetByIdAsync(string id)
        {
            IEnumerable<Genre> result = await _db.GetData<Genre, dynamic>("[SP_SPO_GetGenreById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Genre>> GetAllAsync()
        {
            string query = "[SP_SPO_GetAllGenres]";
            return await _db.GetData<Genre, dynamic>(query, new { });
        }
    }
}
