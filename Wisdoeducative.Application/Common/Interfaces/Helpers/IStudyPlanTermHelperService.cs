using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface IStudyPlanTermHelperService
    {
        Task ValidateStudyTermCreationDto(StudyTermCreationDto studyTermCreationDto);
        StudyPlanTerm CreateNewStudyPlanTerm(StudyTermCreationDto studyTermCreationDto,
            IEnumerable<StudyPlanTermDto> studyPlanTermDtos);
        bool HasCourses(StudyTermCreationDto studyTermCreationDto);
        void AssignStudyPlanTermIdToCourses(IEnumerable<CourseDto> courses, StudyPlanTerm studyPlanTerm);
        Task<List<CourseDto>> CreateCoursesForStudyPlanTerm(List<CourseDto> courses);
        Task<StudyPlanTermDto> AddCalculatedFieldsToTerm(StudyPlanTermDto studyPlanTermDto);
        int GetStudyTermTotalOfCredits(IEnumerable<CourseDto> courseDtos);
        int GetStudyTermProgress(IEnumerable<CourseDto> courseDtos);
    }
}
