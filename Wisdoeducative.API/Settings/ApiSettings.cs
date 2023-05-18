﻿namespace Wisdoeducative.API.Settings
{
    public static class ApiSettings
    {
        public static IServiceCollection AddApiSettings(this IServiceCollection services, 
            IConfiguration configuration, string MyAllowSpecificOrigins)
        {
            services.AddHttpContextAccessor();
            services.AddCorsSettings(configuration, MyAllowSpecificOrigins);
            services.AddAuthenticationSettings(configuration);
            services.AddSwaggerSettings();
            return services;
        }
    }
}
