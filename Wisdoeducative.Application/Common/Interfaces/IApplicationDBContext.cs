using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Histories;

namespace Wisdoeducative.Application.Common.Interfaces
{
    public interface IApplicationDBContext
    {
        DbSet<User> Users { get; set; }
        DbSet<UserHistory> UserHistories { get; set; }
        DbSet<Role> Roles { get; set; }
        DbSet<RoleHistory> RoleHistories { get; set; }
        DbSet<Subscription> Subscriptions { get; set; }
        DbSet<UserSubscription> UserSubscriptions { get; set; }
        DbSet<SubscriptionHistory> SubscriptionHistories { get; set; }
        DbSet<UserSubscriptionHistory> UserSubscriptionHistories { get; set; }
        DbSet<UserSubscriptionTransaction> UserSubscriptionTransactions { get; set; }
        DbSet<Interest> Interests { get; set; }
        DbSet<UserInterest> UserInterests { get; set; }
        DbSet<UserInterestHistory> UserInterestHistories { get; set; }
        DbSet<Degree> Degrees { get; set; }
        DbSet<DegreeHistory> DegreeHistories { get; set; }
        DbSet<Institution> Institutions { get; set; }
        DbSet<InstitutionHistory> InstitutionHistories { get; set; }
        DbSet<UserDegree> UserDegrees { get; set; }
        DbSet<UserDegreeHistory> UserDegreeHistories { get; set; }
        DbSet<MenuOption> MenuOptions { get; set; }
        DbSet<SubscriptionRoleMenuOption> SubscriptionRoleMenuOptions { get; set; }
        DbSet<StudyPlan> StudyPlans { get; set; }
        DbSet<StudyPlanHistory> StudyPlanHistories { get; set; }
        DbSet<StudyPlanTerm> StudyPlanTerms { get; set; }
        DbSet<CourseEvaluation> CourseEvaluations { get; set; }
        DbSet<CoursePrerequisite> CoursePrerequisites { get; set; }
        DbSet<Course> Courses { get; set; }
        DbSet<StudyPlanTermHistory> StudyPlanTermHistories { get; set; }
        DbSet<CourseEvaluationHistory> CourseEvaluationHistories { get; set; }
        DbSet<CourseHistory> CourseHistories { get; set; }
        DbSet<CourseEvaluationTask> CourseEvaluationTasks { get; set; }

        Task<int> SaveChangesAsync();
        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
        DatabaseFacade Database { get; }
    }
}