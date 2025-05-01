using SPO.Application.DataTransferObjects.Request.UserRoles.UserRole;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories.UserRoles
{
    public interface IUserRoleRepository
    {
        Task<string> GetRoleByUserId(string UserId);
        Task<bool> AddAsync(CreateUserRoleRequest? vm);
    }

    public class UserRoleRepository : IUserRoleRepository
    {
        private readonly IDapperBase _db;
        public UserRoleRepository(IDapperBase db) { _db = db; }

        public async Task<bool> AddAsync(CreateUserRoleRequest vm)
        {
            try
            {
                await _db.SaveData("[SP_AILMS_InsertUserRole]", new
                {
                    vm.UserId,
                    vm.RoleId,
                    vm.IsActive,
                    vm.CreatedAt
                });
                return true;
            }
            catch (Exception) { return false; }
        }
        public async Task<string> GetRoleByUserId(string UserId)
        {
            IEnumerable<string> result = await _db.GetData<string, dynamic>("[SP_AILMS_GetRoleByUserId]", new { UserId });
            return result.FirstOrDefault()!;
        }
    }
}
