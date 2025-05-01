using SPO.Application.DataTransferObjects.Request.UserRoles.User;
using SPO.Domain.Entities.UserRoles;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories.UserRoles
{
    public interface IUserRepository
    {
        Task<bool> AddAsync(CreateUserRequest vm);
        Task<bool> UpdateAsync(UpdateUserRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<User?> GetByIdAsync(string id);
        Task<IEnumerable<User?>> GetAllAsync();

        Task<Role?> GetRoleByUserId(string id);

    }

    public class UserRepository : IUserRepository
    {
        private readonly IDapperBase _db;
        public UserRepository(IDapperBase db) { _db = db; }

        public async Task<bool> AddAsync(CreateUserRequest vm)
        {
            try
            {
                await _db.SaveData("[SP_AILMS_InsertUser]", new
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
                await _db.SaveData("[SP_AILMS_UpdateUser]", new
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

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_AILMS_DeleteUser", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<User?> GetByIdAsync(string id)
        {
            IEnumerable<User> result = await _db.GetData<User, dynamic>("[SP_AILMS_GetUserById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            string query = "[SP_AILMS_GetAllUsers]";
            return await _db.GetData<User, dynamic>(query, new { });
        }

        public async Task<Role?> GetRoleByUserId(string id)
        {
            IEnumerable<Role> result = await _db.GetData<Role, dynamic>("[SP_AILMS_GetRoleByUserId]", new { Id = id });
            return result.FirstOrDefault();
        }
    }
}
