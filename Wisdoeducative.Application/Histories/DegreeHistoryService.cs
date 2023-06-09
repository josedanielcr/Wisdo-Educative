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
    public class DegreeHistoryService : IEntityHistoryService<Degree>
    {
        private readonly IApplicationDBContext dBContext;

        public DegreeHistoryService(IApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task SaveChanges(Degree entity, int degreeId, EntityChangeTypes type, string modifiedBy)
        {
            dBContext.DegreeHistories.Add(new DegreeHistory
            {
                Date = DateTime.Now,
                EntityChangeType = type,
                ModifiedByUser = modifiedBy,
                DegreeId = degreeId,
                StudyField = entity.StudyField,
                Type = entity.Type,
                Name = entity.Name,
                Status = entity.Status
            });
        }
    }
}
