using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class Course : BaseEntity
    {
        // Courses that are prerequisites for this course
        public ICollection<CoursePrerequisite>? Prerequisites { get; set; }
        // Courses for which this course is a prerequisite
        public ICollection<CoursePrerequisite>? PrerequisiteOfCourses { get; set; }
        public StudyPlanTerm StudyPlanTerm { get; set; }
        public int StudyPlanTermId { get; set; }
        public CourseSchedule? CourseSchedule { get; set; }
        public int? CourseScheduleId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int TotalCredits { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? CurrentScore { get; set; }
        public float? Price { get; set; }
        public EntityStatus status { get; set; }
        public CourseStatus CourseStatus { get; set; }
    }
}
