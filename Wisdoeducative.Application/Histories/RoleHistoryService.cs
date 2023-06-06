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

        public RoleHistoryService(IApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task SaveChanges(Role entity, int roleId, EntityChangeTypes type, string modifiedBy)
        {
            dBContext.RoleHistories.Add(new RoleHistory
            {
                Date = DateTime.Now,
                EntityChangeType = type,
                ModifiedByUser = modifiedBy,
                RoleId = roleId,
                Name = entity.Name,
                Description = entity.Description,
                Status = entity.Status
            });
        }
    }
}