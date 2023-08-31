﻿using System;
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
    public class CourseHistoryService : IEntityHistoryService<Course>
    {
        private readonly IApplicationDBContext dBContext;

        public CourseHistoryService(IApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task SaveChanges(Course entity, int entityId, EntityChangeTypes type, string modifiedBy)
        {
            dBContext.CourseHistories.Add(new CourseHistory
            {
                Date = DateTime.Now,
                EntityChangeType = type,
                ModifiedByUser = modifiedBy,
                CourseId = entityId,
                Name = entity.Name,
                TotalCredits = entity.TotalCredits,
                CurrentScore = entity.CurrentScore,
                Status = entity.status,
                IsFavorite = entity.IsFavorite,
                CourseStatus = entity.CourseStatus,
                StudyPlanTermId = entity.StudyPlanTermId,
                CourseScheduleId = entity.CourseScheduleId
            });
        }
    }
}
