using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Settings;

namespace Wisdoeducative.Application
{
    public static class ApplicationSettings
    {
        public static IServiceCollection AddApplicationSettings(this IServiceCollection services, IConfiguration configuration)
        {
            //autoMapper
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            //services
            services.AddServicesSettings();
            //helpers
            services.AddHelpersSettings();
            return services;
        }
    }
}
