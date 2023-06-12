using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.Helpers;
using Wisdoeducative.Application.Services;

namespace Wisdoeducative.Application.Settings
{
    public static class HelpersSettings
    {
        public static IServiceCollection AddHelpersSettings(this IServiceCollection services)
        {
            //services
            services.AddScoped<IUserHelperService, UserHelperService>();
            services.AddScoped<ISubscriptionHelperService, SubscriptionHelperService>();
            services.AddScoped<IEntityHelperService, EntityHelperService>();
            services.AddScoped<IDegreeHelperService, DegreeHelperService>();
            services.AddScoped<IInstitutionHelperService, InstitutionHelperService>();
            return services;
        }
    }
}
