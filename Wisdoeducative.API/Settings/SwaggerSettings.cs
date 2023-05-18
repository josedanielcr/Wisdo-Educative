using Microsoft.OpenApi.Models;

namespace Wisdoeducative.API.Settings
{
    public static class SwaggerSettings
    {
        public static IServiceCollection AddSwaggerSettings(this IServiceCollection services)
        {
            var runningEnvironment = Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME");
            if (runningEnvironment != null) return services;

            services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Wisdo Educative Dev API", Version = "v1" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement {
                {   
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type=ReferenceType.SecurityScheme,
                            Id="Bearer"
                        }
                    },
                    new string[]{}
                    }
                });
            });

            return services;
        }
    }
}