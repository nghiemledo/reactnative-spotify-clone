using Microsoft.Extensions.DependencyInjection;
using SPO.Infrastructure.Dappers.Base;
using SPO.Infrastructure.Repositories.UserRoles;

namespace SPO.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            // Register custom repositories
            AddRepository(services);
        }
        public static void AddRepository(this IServiceCollection services)
        {
            services.AddScoped<IDapperBase, DapperBase>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserRoleRepository, UserRoleRepository>();
            //services.AddScoped<IFunctionRepository, FunctionRepository>();
        }
    }
}
