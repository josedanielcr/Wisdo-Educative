﻿using Microsoft.EntityFrameworkCore;
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

        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<AddressHistory> AddressHistories { get; set; }
        public DbSet<UserHistory> UserHistories { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleHistory> RoleHistories { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<UserSubscription> UserSubscriptions { get; set; }
        public DbSet<SubscriptionHistory> SubscriptionHistories { get; set; }
        public DbSet<UserSubscriptionHistory> UserSubscriptionHistories { get; set; }
        public DbSet<UserSubscriptionTransaction> UserSubscriptionTransactions { get; set; }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    }
}