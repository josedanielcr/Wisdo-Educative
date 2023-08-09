using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Exceptions;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.Resources;

namespace Wisdoeducative.Application.Services
{
    public class StudyPlanService : IStudyPlanService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;

        public StudyPlanService(IApplicationDBContext dBContext,
            IMapper mapper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
        }

        public async Task<StudyPlanDTO> GetUserStudyPlan(int userDegreeId)
        {
            var studyPlan = await dBContext.StudyPlans
                .Where(s => s.UserDegreeId == userDegreeId)
                .FirstOrDefaultAsync()
            ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound} Study plan");

            return mapper.Map<StudyPlanDTO>(studyPlan);
        }
    }
}
