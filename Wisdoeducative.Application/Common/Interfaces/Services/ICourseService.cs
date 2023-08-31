using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface ICourseService
    {
        Task<List<CourseDto>> CreateCourse(List<CourseDto> courses);
        Task<IEnumerable<CourseDto>> GetStudyTermCourses(int studyTermId);
        Task<IEnumerable<CourseDto>> SearchCourses(int studyPlanId, SearchCourseDto searchCourseModel);
    }
}