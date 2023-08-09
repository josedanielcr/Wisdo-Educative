using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;
using Wisdoeducative.Domain.Histories;

namespace Wisdoeducative.Application.Histories
{
    public class StudyPlanTermHistoryService : IEntityHistoryService<StudyPlanTerm>
    {
        private readonly IApplicationDBContext dBContext;

        public StudyPlanTermHistoryService(IApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task SaveChanges(StudyPlanTerm entity, int studyPlanTermId, EntityChangeTypes type, string modifiedBy)
        {
            
        }
    }
}