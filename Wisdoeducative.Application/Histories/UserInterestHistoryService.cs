using AutoMapper;
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
    public class UserInterestHistoryService : IEntityHistoryService<UserInterest>
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;

        public UserInterestHistoryService(IApplicationDBContext dBContext,
            IMapper mapper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
        }

        public void SaveChanges(UserInterest entity, int entityId, EntityChangeTypes type, string modifiedBy)
        {
            dBContext.UserInterestHistories.Add(new UserInterestHistory
            {
                Date = DateTime.Now,
                EntityChangeType = type,
                ModifiedByUser = modifiedBy,
                ChangedInterestId = entity.Id,
                ChangedInterest = entity
            });
        }
    }
}
