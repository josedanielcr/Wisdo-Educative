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
    public class RoleHistoryService : IEntityHistoryService<Role>
    {
        private readonly IApplicationDBContext dBContext;
        private readonly ILogger<RoleHistoryService> logger;

        public RoleHistoryService(IApplicationDBContext dBContext,
            ILogger<RoleHistoryService> logger)
        {
            this.dBContext = dBContext;
            this.logger = logger;
        }

        public void SaveChanges(Role entity, int roleId, EntityChangeTypes type, string modifiedBy)
        {
            try
            {
                dBContext.RoleHistories.Add(new RoleHistory
                {
                    Date = DateTime.Now,
                    EntityChangeType = type,
                    ModifiedByUser = modifiedBy,
                    ChangedRoleId = roleId,
                    ChangedRole = entity
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