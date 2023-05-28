using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
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

        Task<int> SaveChangesAsync();
        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
    }
}