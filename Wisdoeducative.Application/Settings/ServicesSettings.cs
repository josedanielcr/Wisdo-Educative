using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.Services;

namespace Wisdoeducative.Application.Settings
{
    public static class ServicesSettings
    {
        public static IServiceCollection AddServicesSettings(this IServiceCollection services)
        {
            //histories
            services.AddHistorySettings();
            //services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IRoleService, RoleService>();
            return services;
        }
    }
}