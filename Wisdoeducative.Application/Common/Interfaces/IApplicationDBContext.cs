using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Historics;

namespace Wisdoeducative.Application.Common.Interfaces
{
    public interface IApplicationDBContext
    {
        DbSet<User> Users { get; set; }
        DbSet<Address> Addresses { get; set; }
        DbSet<UserHistory> UserHistories { get; set; }
        DbSet<AddressHistory> AddressHistories { get; set; }
        Task<int> SaveChangesAsync();
    }
}