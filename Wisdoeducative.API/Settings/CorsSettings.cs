namespace Wisdoeducative.API.Settings
{
    public static class CorsSettings
    {
        public static IServiceCollection AddCorsSettings(this IServiceCollection services,
            IConfiguration configuration,
            string MyAllowSpecificOrigins)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins, builder =>
                {
                    builder.WithOrigins("http://localhost:4200", "https://localhost:4200",
                        "https://lemon-glacier-05e76cc10.3.azurestaticapps.net")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });

            return services;
        }

    }
}
