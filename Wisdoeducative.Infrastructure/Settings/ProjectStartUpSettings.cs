using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application;

namespace Wisdoeducative.Infrastructure.Settings
{
    public static class ProjectStartUpSettings
    {
        public static IServiceCollection AddProjectStartUpSettings(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddApplicationSettings(configuration);
            services.AddInfrastructureSettings(configuration);
            return services;
        }
    }
}