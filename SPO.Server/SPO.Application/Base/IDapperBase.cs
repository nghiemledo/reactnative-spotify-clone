namespace SPO.Infrastructure.Dappers.Base
{
    public interface IDapperBase
    {
        Task<IEnumerable<T>> GetData<T, P>(string spName, P parameters, string connectionId = "DefaultConnection");
        Task SaveData<T>(string spName, T parameters, string connectionId = "DefaultConnection");
    }
}
