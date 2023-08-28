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
    public class UserDegreeHistoryService : IEntityHistoryService<UserDegree>
    {
        private readonly IApplicationDBContext dBContext;

        public UserDegreeHistoryService(IApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }
        
        public async Task SaveChanges(UserDegree entity, int userDegreeId, EntityChangeTypes type, string modifiedBy)
        {
            dBContext.UserDegreeHistories.Add(new UserDegreeHistory
            {
                Date = DateTime.Now,
                EntityChangeType = type,
                ModifiedByUser = modifiedBy,
                UserDegreeId = userDegreeId,
                Degree = entity.Degree,
                DegreeId = entity.DegreeId,
                User = entity.User,
                UserId = entity.UserId,
                Institution = entity.Institution,
                InstitutionId = entity.InstitutionId,
                CurrentProgress = entity.CurrentProgress,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                Schedule = entity.Schedule,
                IsDefault = entity.IsDefault,
                Status = entity.Status
            });
        }
    }
}
