using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Application.Histories;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Histories;

namespace Wisdoeducative.Application.Settings
{
    public static class HistorySettings
    {
        public static IServiceCollection AddHistorySettings(this IServiceCollection services)
        {
            services.AddScoped<IEntityHistoryService<User>, UserHistoryService>();
            services.AddScoped<IEntityHistoryService<Role>, RoleHistoryService>();
            services.AddScoped<IEntityHistoryService<Subscription>, SubscriptionHistoryService>();
            services.AddScoped<IEntityHistoryService<UserSubscription>, UserSubscriptionHistoryService>();
            services.AddScoped<IEntityHistoryService<UserInterest>, UserInterestHistoryService>();
            services.AddScoped<IEntityHistoryService<Degree>, DegreeHistoryService>();
            services.AddScoped<IEntityHistoryService<UserDegree>, UserDegreeHistoryService>();
            services.AddScoped<IEntityHistoryService<StudyPlan>, StudyPlanHistoryService>();
            return services;
        }
    }
}