using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Histories;

namespace Wisdoeducative.Infrastructure.Persistence
{
    public class ApplicationDBContext : DbContext, IApplicationDBContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }

        public new EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class
        {
            return base.Entry(entity);
        }
        
        public DatabaseFacade Database => base.Database;

        public DbSet<User> Users { get; set; }
        public DbSet<UserHistory> UserHistories { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleHistory> RoleHistories { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<UserSubscription> UserSubscriptions { get; set; }
        public DbSet<SubscriptionHistory> SubscriptionHistories { get; set; }
        public DbSet<UserSubscriptionHistory> UserSubscriptionHistories { get; set; }
        public DbSet<UserSubscriptionTransaction> UserSubscriptionTransactions { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DbSet<UserInterest> UserInterests { get; set; }
        public DbSet<UserInterestHistory> UserInterestHistories { get; set; }
        public DbSet<Degree> Degrees { get; set; }
        public DbSet<DegreeHistory> DegreeHistories { get; set; }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<InstitutionHistory> InstitutionHistories { get; set; }
        public DbSet<UserDegree> UserDegrees { get; set; }
        public DbSet<UserDegreeHistory> UserDegreeHistories { get; set; }
        public DbSet<MenuOption> MenuOptions { get; set; }
        public DbSet<SubscriptionRoleMenuOption> SubscriptionRoleMenuOptions { get; set; }
        public DbSet<StudyPlan> StudyPlans { get; set; }
        public DbSet<StudyPlanHistory> StudyPlanHistories { get; set; }
        public DbSet<StudyPlanTerm> StudyPlanTerms { get; set; }
        public DbSet<CourseEvaluation> CourseEvaluations { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<StudyPlanTermHistory> StudyPlanTermHistories { get; set; }
        public DbSet<CourseEvaluationHistory> CourseEvaluationHistories { get; set; }
        public DbSet<CourseHistory> CourseHistories { get; set; }
        public DbSet<CourseEvaluationTask> CourseEvaluationTasks { get; set; }
        public DbSet<CourseLink> CourseLinks { get; set; }
        public DbSet<Pomodoro> Pomodoros { get; set; }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}