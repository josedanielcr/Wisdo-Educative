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
    public class SubscriptionHistoryService : IEntityHistoryService<Subscription>
    {
        private readonly IApplicationDBContext dBContext;
        public SubscriptionHistoryService(IApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task SaveChanges(Subscription entity, int entityId, EntityChangeTypes type, string modifiedBy)
        {
            dBContext.SubscriptionHistories.Add(new SubscriptionHistory
            {
                Date = DateTime.Now,
                EntityChangeType = type,
                ModifiedByUser = modifiedBy,
                SubscriptionId = entityId,
                Name = entity.Name,
                Description = entity.Description,
                Price = entity.Price,
                Status = entity.Status
            });
        }
    }
}