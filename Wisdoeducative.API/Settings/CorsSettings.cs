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
                    builder.WithOrigins("https://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });

            return services;
        }

    }
}
