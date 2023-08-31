using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface IStudyPlanHelperService
    {
        bool ValidateStudyPlanBeforeCreate(StudyPlanDTO studyPlanDto);

        StudyPlan CreateNewStudyPlanFromDto(StudyPlanDTO studyPlanDto);
    }
}
