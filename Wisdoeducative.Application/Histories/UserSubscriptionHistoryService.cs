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
    public class UserSubscriptionHistoryService : IEntityHistoryService<UserSubscription>
    {
        private readonly IApplicationDBContext dBContext;
        public UserSubscriptionHistoryService(IApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task SaveChanges(UserSubscription entity, int entityId, EntityChangeTypes type, string modifiedBy)
        {
            dBContext.UserSubscriptionHistories.Add(new UserSubscriptionHistory
            {
                Date = DateTime.Now,
                EntityChangeType = type,
                ModifiedByUser = modifiedBy,
                UserSubscriptionId = entityId,
                UserId = entity.UserId,
                SubscriptionId = entity.SubscriptionId,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                NextPayment = entity.NextPayment,
                LastPayment = entity.LastPayment,
                Status = entity.Status
            });
        }

    }
}