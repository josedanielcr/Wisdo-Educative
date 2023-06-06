using AutoMapper;
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
    public class UserInterestHistoryService : IEntityHistoryService<UserInterest>
    {
        private readonly IApplicationDBContext dBContext;

        public UserInterestHistoryService(IApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task SaveChanges(UserInterest entity, int entityId, EntityChangeTypes type, string modifiedBy)
        {
            dBContext.UserInterestHistories.Add(new UserInterestHistory
            {
                Date = DateTime.Now,
                EntityChangeType = type,
                ModifiedByUser = modifiedBy,
                UserInterestId = entityId,
                InterestId = entity.InterestId,
                UserId = entity.UserId,
                Status = entity.Status
            });
        }
    }
}
