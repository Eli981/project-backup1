namespace api.Extensions;
public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityService(this IServiceCollection services, IConfiguration configuration)
    {
        #region Authenticatin & Authorization
        string tokenvalue = configuration["TokenKey"]!;

        if (!string.IsNullOrEmpty(tokenvalue))
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(Options =>
            {
                Options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenvalue)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }
        #endregion  Authenticatin & Authorization

        return services;
    }
}
