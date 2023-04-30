using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Infrastructure.Settings;

namespace Wisdoeducative.Infrastructure
{
    public static class InfrastructureSettings
    {
        public static IServiceCollection AddInfrastructureSettings(this IServiceCollection services, IConfiguration configuration)
        {
            //Database connection
            services.AddDatabaseSettings(configuration);

            return services;
        }
    }
}
