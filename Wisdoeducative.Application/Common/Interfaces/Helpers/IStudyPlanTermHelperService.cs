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
        bool ValidateStudyTermCreationDto(StudyTermCreationDto studyTermCreationDto);
        StudyPlanTerm CreateNewStudyPlanTerm(StudyTermCreationDto studyTermCreationDto,
            IEnumerable<StudyPlanTermDto> studyPlanTermDtos);
        bool HasCourses(StudyTermCreationDto studyTermCreationDto);
        void AssignStudyPlanTermIdToCourses(IEnumerable<CourseDto> courses, int studyPlanTermId);

        Task<List<CourseDto>> CreateCoursesForStudyPlanTerm(List<CourseDto> courses);
    }
}
