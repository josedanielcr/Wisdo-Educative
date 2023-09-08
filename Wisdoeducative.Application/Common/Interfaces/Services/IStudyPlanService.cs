using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface IStudyPlanService
    {
        Task<StudyPlanDTO> GetUserStudyPlan(int studyPlanId);
        Task<StudyPlanDTO> CreateStudyPlan(StudyPlanDTO studyPlan);
        Task<StudyPlanDTO> GetStudyPlanById(int studyPlanId);
        Task<StudyPlanDTO> GetUserStudyPlanByUserDegreeId(int userDegreeId);
    }
}
