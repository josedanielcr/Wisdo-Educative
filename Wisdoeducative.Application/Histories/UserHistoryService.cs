using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;
using Wisdoeducative.Domain.Histories;

namespace Wisdoeducative.Application.Histories
{
    public class UserHistoryService : IEntityHistoryService<User>
    {
        private readonly IApplicationDBContext dBContext;

        public UserHistoryService(IApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task SaveChanges(User entity, int userId, EntityChangeTypes type, string modifiedBy)
        {
            dBContext.UserHistories.Add(new UserHistory
            {
                Date = DateTime.Now,
                EntityChangeType = type,
                ModifiedByUser = modifiedBy,
                UserId = userId,
                B2cId = entity.B2cId,
                Name = entity.Name,
                LastName = entity.LastName,
                DateOfBirth = entity.DateOfBirth,
                Email = entity.Email,
                Role = entity.Role,
                RoleId = entity.RoleId,
                Category = entity.Category,
                UserStatus = entity.UserStatus
            });
        }
    }
}