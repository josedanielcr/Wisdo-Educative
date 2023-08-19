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
    public class StudyPlanHistoryService : IEntityHistoryService<StudyPlan>
    {
        private readonly IApplicationDBContext dBContext;

        public StudyPlanHistoryService(IApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task SaveChanges(StudyPlan entity, int entityId, EntityChangeTypes type, string modifiedBy)
        {
            dBContext.StudyPlanHistories.Add(new StudyPlanHistory
            {
                Date = DateTime.Now,
                EntityChangeType = type,
                ModifiedByUser = modifiedBy,
                UserDegreeId = entity.UserDegreeId,
                GradingSystemId = entity.GradingSystemId,
                TotalCredits = entity.TotalCredits,
                EarnedCredits = entity.EarnedCredits,
                Status = entity.Status
            });
        }
    }
}