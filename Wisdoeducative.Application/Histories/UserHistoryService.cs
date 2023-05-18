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
using Wisdoeducative.Domain.Historics;

namespace Wisdoeducative.Application.Histories
{
    public class UserHistoryService : IEntityHistoryService<User>
    {
        private readonly IApplicationDBContext dBContext;
        private readonly ILogger<UserHistoryService> logger;

        public UserHistoryService(IApplicationDBContext dBContext,
            ILogger<UserHistoryService> logger)
        {
            this.dBContext = dBContext;
            this.logger = logger;
        }

        public void SaveChanges(User entity, EntityChangeTypes type, string modifiedBy)
        {
            try
            {
                dBContext.UserHistories.Add(new UserHistory
                {
                    Date = DateTime.Now,
                    EntityChangeType = type,
                    ModifiedByUser = modifiedBy,
                    ChangedUser = entity
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"{ErrorMessages.HistorySaveErrorMessage}{entity}");
                throw;
            }
            
        }
    }
}