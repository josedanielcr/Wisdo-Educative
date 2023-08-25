using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.DTOs
{
    public class CourseDto : IMapFrom<Course>
    {
        // Courses that are prerequisites for this course
        public ICollection<CoursePrerequisiteDto>? Prerequisites { get; set; }
        // Courses for which this course is a prerequisite
        public ICollection<CoursePrerequisiteDto>? PrerequisiteOfCourses { get; set; }
        public int Id { get; set; }
        public StudyPlanTermDto? StudyPlanTermDto { get; set; } 
        public int? StudyPlanTermId { get; set; }
        public CourseScheduleDto? CourseScheduleDto { get; set; } 
        public int? CourseScheduleId { get; set; }
        public string Name { get; set; }
        public int TotalCredits { get; set; }
        public string? CurrentScore { get; set; }
        public string? Status { get; set; }
        public string? CourseStatus { get; set; }
    }
}
