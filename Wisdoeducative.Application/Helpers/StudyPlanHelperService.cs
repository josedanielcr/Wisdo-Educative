using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Exceptions;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Helpers
{
    public class StudyPlanHelperService : IStudyPlanHelperService
    {
        private readonly IEntityHelperService entityHelperService;
        private readonly IMapper mapper;

        public StudyPlanHelperService(IEntityHelperService entityHelperService,
            IMapper mapper)
        {
            this.entityHelperService = entityHelperService;
            this.mapper = mapper;
        }

        public bool ValidateStudyPlanBeforeCreate(StudyPlanDTO studyPlanDto)
        {
            string[] propertiesToCheck = new string[] { "UserDegreeId" };
            if (entityHelperService.AreAnyPropertiesNull(studyPlanDto, propertiesToCheck))
            {
                return false;
            }
            return true;
        }

        public StudyPlan CreateNewStudyPlanFromDto(StudyPlanDTO studyPlanDto)
        {
            StudyPlan studyPlanEntity = mapper.Map<StudyPlan>(studyPlanDto);
            studyPlanEntity.Status = Domain.Enums.EntityStatus.Active;
            return studyPlanEntity;
        }
    }
}
