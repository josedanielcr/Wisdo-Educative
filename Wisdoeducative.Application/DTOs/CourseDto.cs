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
        public int Id { get; set; }
        public StudyPlanTermDto StudyPlanTermDto { get; set; } 
        public int StudyPlanTermId { get; set; }
        public CourseScheduleDto? CourseScheduleDto { get; set; } 
        public int? CourseScheduleId { get; set; }
        public IEnumerable<CoursePrerequisiteDto>? CoursePrerequisitesDto { get; set; } 
        public string Name { get; set; }
        public string? Description { get; set; }
        public int TotalCredits { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? CurrentScore { get; set; }
        public float? Price { get; set; }
        public string Status { get; set; }
        public string CourseStatus { get; set; }
    }
}
