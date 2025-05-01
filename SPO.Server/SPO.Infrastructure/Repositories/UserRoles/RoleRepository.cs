using SPO.Application.DataTransferObjects.Request.UserRoles.Role;
using SPO.Domain.Entities.UserRoles;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories.UserRoles
{
    public interface IRoleRepository
    {
        Task<bool> AddAsync(CreateRoleRequest vm);
        Task<bool> UpdateAsync(UpdateRoleRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<Role?> GetByIdAsync(string id);
        Task<IEnumerable<Role>> GetAllAsync();
        Task<Role?> GetByNameAsync(string firstname);

    }

    public class RoleRepository : IRoleRepository
    {
        private readonly IDapperBase _db;
        public RoleRepository(IDapperBase db) { _db = db; }

        public async Task<bool> AddAsync(CreateRoleRequest vm)
        {
            try
            {
                await _db.SaveData("[SP_AILMS_InsertRole]", new
                {
                    vm.Name
                });
                return true;
            }
            catch (Exception) { return false; }
        }

        public async Task<bool> UpdateAsync(UpdateRoleRequest vm)
        {
            try
            {
                await _db.SaveData("[SP_AILMS_UpdateRole]", new
                {
                    vm.Id,
                    vm.Name
                });
                return true;
            }
            catch (Exception) { return false; }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_AILMS_DeleteRole", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<Role?> GetByIdAsync(string id)
        {
            IEnumerable<Role> result = await _db.GetData<Role, dynamic>("[SP_AILMS_GetRoleById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            string query = "[SP_AILMS_GetAllRoles]";
            return await _db.GetData<Role, dynamic>(query, new { });
        }

        public async Task<Role> GetByNameAsync(string name)
        {
            IEnumerable<Role> result = await _db.GetData<Role, dynamic>("[SP_AILMS_GetRoleByName]", new { Name = name });
            return result.FirstOrDefault();
        }
    }
}
