using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;
using Wisdoeducative.Domain.Histories;

namespace Wisdoeducative.Application.Histories
{
    public class SubscriptionHistoryService : IEntityHistoryService<Subscription>
    {
        private readonly IApplicationDBContext dBContext;
        public SubscriptionHistoryService(IApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public void SaveChanges(Subscription entity, int entityId, EntityChangeTypes type, string modifiedBy)
        {
            dBContext.SubscriptionHistories.Add(new SubscriptionHistory
            {
                Date = DateTime.Now,
                EntityChangeType = type,
                ModifiedByUser = modifiedBy,
                ChangedSubscriptionId = entity.Id,
                ChangedSubscription = entity
            });
        }
    }
}