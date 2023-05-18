using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Infrastructure.Persistence;

namespace Wisdoeducative.Infrastructure.Settings
{
    public static class DatabaseSettings
    {
        public static IServiceCollection AddDatabaseSettings(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = GetConnectionString(configuration);

            services.AddDbContext<ApplicationDBContext>(options =>
                options.UseSqlServer(connectionString,
                    builder => builder.MigrationsAssembly(typeof(ApplicationDBContext).Assembly.FullName))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));

            services.AddScoped<IApplicationDBContext>(provider => provider.GetRequiredService<ApplicationDBContext>());
            services.AddScoped<ApplicationDBContextInitializer>();

            return services;
        }

        private static string GetConnectionString(IConfiguration configuration)
        {
            var runningEnvironment = Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME");
            var connectionStringKey = runningEnvironment == null ? "DefaultConnection" : "ProdConnection";
            return configuration[connectionStringKey]!;
        }
    }
}