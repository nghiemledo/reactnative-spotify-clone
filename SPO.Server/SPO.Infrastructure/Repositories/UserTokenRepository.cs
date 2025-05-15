using SPO.Application.DataTransferObjects.Request.UserToken;
using SPO.Domain.Entities.UserRoles;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories
{
    public interface IUserTokenRepository
    {
        Task<bool> AddAsync(CreateUserTokenRequest vm);
        Task<UserToken?> GetByValueAsync(string token);
    }
    public class UserTokenRepository : IUserTokenRepository
    {
        private readonly IDapperBase _db;
        public UserTokenRepository(IDapperBase db) { _db = db; }

        public async Task<bool> AddAsync(CreateUserTokenRequest vm)
        {
            try
            {
                await _db.SaveData("[SP_SPO_InsertUserToken]", new
                {
                    vm.UserId,
                    vm.LoginProvider,
                    vm.Name,
                    vm.Value,
                    vm.Expires
                });
                return true;
            }
            catch (Exception) { return false; }
        }

        public async Task<UserToken?> GetByValueAsync(string token)
        {
            IEnumerable<UserToken> result = await _db.GetData<UserToken, dynamic>("[SP_SPO_GetTokenByValue]", new { Value = token });
            return result.FirstOrDefault();
        }
    }
}
