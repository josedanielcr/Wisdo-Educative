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
            services.AddScoped<ISubscriptionService, SubscriptionService>();
            services.AddScoped<IInterestService, InterestService>();
            services.AddScoped<IDegreeService, DegreeService>();
            services.AddScoped<IInstitutionService, InstitutionService>();
            services.AddScoped<IMenuService, MenuService>();
            services.AddScoped<IStudyPlanService, StudyPlanService>();
            services.AddScoped<IStudyPlanService, StudyPlanService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<IStudyPlanTermService, StudyPlanTermService>();
            services.AddScoped<ICourseEvaluationService, CourseEvaluationService>();
            services.AddScoped<ICourseLinkService, CourseLinkService>();
            services.AddScoped<IPomodoroService, PomodoroService>();
            services.AddScoped<IUserStatisticsService, UserStatisticsService>();
            return services;
        }
    }
}