namespace api.Extensions;
public static class RepositoryServiceExtensions
{
    public static IServiceCollection AddRepositoryServices(this IServiceCollection services)
    {
        #region Dependency Injection
        services.AddScoped<IAdminRepository, AdminRepository>();

        services.AddScoped<IUserRepository, UserRepository>();

        services.AddScoped<IAccountRepository, AccountRepository>();

        #endregion

        return services;
    }
}
