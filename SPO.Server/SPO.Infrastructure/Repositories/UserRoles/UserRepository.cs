using SPO.Application.DataTransferObjects.Request.UserRoles.User;
using SPO.Application.DataTransferObjects.Response.User;
using SPO.Domain.Entities.UserRoles;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories.UserRoles
{
    public interface IUserRepository
    {
        Task<bool> AddAsync(CreateUserRequest vm);
        Task<bool> UpdateAsync(UpdateUserRequest vm);
        Task<User> UpdateLockOutAsync(UpdateLockOutUserRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<User?> GetByIdAsync(string id);
        Task<IEnumerable<User?>> GetAllAsync();
        Task<Role?> GetRoleByUserId(string id);
        Task<bool> FollowArtistAsync(string userId, string artistId);
        Task<IEnumerable<FollowedArtistResponse>> GetFollowedArtistsAsync(string userId);
        Task<IEnumerable<GetPlaylistByUserIdResponse>> GetPlaylistsByUserIdAsync(string userId);
        Task<bool> FollowPodcastAsync(string userId, string showId);
        Task<IEnumerable<FollowedPodcastResponse>> GetFollowedPodcastsAsync(string userId);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IDapperBase _db;
        public UserRepository(IDapperBase db) { _db = db; }

        public async Task<bool> AddAsync(CreateUserRequest vm)
        {
            try
            {
                await _db.SaveData("[SP_SPO_InsertUser]", new
                {
                    vm.LastName,
                    vm.FirstName,
                    vm.Email,
                    vm.PhoneNumber,
                    vm.Password
                });
                return true;
            }
            catch (Exception) { return false; }
        }

        public async Task<bool> UpdateAsync(UpdateUserRequest vm)
        {
            try
            {
                await _db.SaveData("[SP_SPO_UpdateUser]", new
                {
                    vm.Id,
                    vm.Email,
                    vm.FirstName,
                    vm.LastName,
                    vm.PasswordHash
                });
                return true;
            }
            catch (Exception) { return false; }
        }

        public async Task<User> UpdateLockOutAsync(UpdateLockOutUserRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Id,
                    vm.LockOutEnabled
                };

                await _db.SaveData("[SP_SPO_UpdateLockOutUser]", parameters);
                var updatedUser = await _db.GetData<User, dynamic>(
                    "[SP_SPO_GetUserById]",
                    new { Id = vm.Id }
                );

                return updatedUser.FirstOrDefault() ?? throw new Exception("Cannot get data.");
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
                await _db.SaveData("SP_SPO_DeleteUser", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            IEnumerable<User> result = await _db.GetData<User, dynamic>("[SP_SPO_GetUserById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            string query = "[SP_SPO_GetAllUsers]";
            return await _db.GetData<User, dynamic>(query, new { });
        }

        public async Task<Role?> GetRoleByUserId(string id)
        {
            IEnumerable<Role> result = await _db.GetData<Role, dynamic>("[SP_SPO_GetRoleByUserId]", new { UserId = id });
            return result.FirstOrDefault();
        }

        public async Task<bool> FollowArtistAsync(string userId, string artistId)
        {
            try
            {
                await _db.SaveData("[dbo].[SP_SPO_FollowArtist]", new
                {
                    UserId = Guid.Parse(userId),
                    ArtistId = Guid.Parse(artistId)
                });
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<IEnumerable<FollowedArtistResponse>> GetFollowedArtistsAsync(string userId)
        {
            try
            {
                if (!Guid.TryParse(userId, out Guid userGuid))
                {
                    throw new ArgumentException("Invalid UserId format.");
                }
                var result = await _db.GetData<FollowedArtistResponse, dynamic>(
                    "[dbo].[SP_SPO_GetFollowedArtists]",
                    new { UserId = userGuid }
                );
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred when retrieving followed artists", ex);
            }
        }

        public async Task<IEnumerable<GetPlaylistByUserIdResponse>> GetPlaylistsByUserIdAsync(string userId)
        {
            try
            {
                var result = await _db.GetData<GetPlaylistByUserIdResponse, dynamic>(
                    "[dbo].[SP_SPO_GetPlaylistsByUserId]",
                    new { UserId = userId }
                );
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred when retrieving playlists", ex);
            }
        }

        public async Task<bool> FollowPodcastAsync(string userId, string showId)
        {
            try
            {
                await _db.SaveData("[dbo].[SP_SPO_FollowPodcast]", new
                {
                    UserId = userId,
                    ShowId = showId
                });
                return true;
            }
            catch (Exception) { return false; }
        }

        public async Task<IEnumerable<FollowedPodcastResponse>> GetFollowedPodcastsAsync(string userId)
        {
            try
            {
                var result = await _db.GetData<FollowedPodcastResponse, dynamic>(
                    "[dbo].[SP_SPO_GetFollowedPodcasts]",
                    new { UserId = userId }
                );
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred when retrieving followed podcasts", ex);
            }
        }

    }
}
