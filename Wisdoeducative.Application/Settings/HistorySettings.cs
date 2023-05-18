using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Application.Histories;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Settings
{
    public static class HistorySettings
    {
        public static IServiceCollection AddHistorySettings(this IServiceCollection services)
        {
            services.AddScoped<IEntityHistoryService<User>, UserHistoryService>();
            services.AddScoped<IEntityHistoryService<Address>, AddressHistoryService>();
            return services;
        }
    }
}
