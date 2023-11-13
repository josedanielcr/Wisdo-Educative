using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface IStudyPlanTermService
    {
        Task<StudyTermCreationDto> CreateStudyPlanTerm(StudyTermCreationDto studyTermCreationDto);
        Task<IEnumerable<StudyPlanTermDto>> GetUserStudyPlanTerms(int? studyPlanId);
    }
}
