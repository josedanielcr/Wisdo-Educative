using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface IStudyPlanService
    {
        Task<StudyPlanDTO> GetUserStudyPlan(int userDegreeId);
        Task<StudyPlanDTO> CreateStudyPlan(StudyPlanDTO studyPlan);
        Task<StudyPlanTermDto> CreateStudyPlanTerm(StudyPlanTermDto studyPlanTermDto);
        Task<IEnumerable<StudyPlanTermDto>> GetUserStudyPlanTerms(int studyPlanId);
    }
}
