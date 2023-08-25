using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Histories
{
    public class CourseHistory : BaseAuditableEntity
    {
        public StudyPlanTerm StudyPlanTerm { get; set; }
        public int StudyPlanTermId { get; set; }
        public CourseSchedule? CourseSchedule { get; set; }
        public int? CourseScheduleId { get; set; }
        public string Name { get; set; }
        public int TotalCredits { get; set; }
        public string? CurrentScore { get; set; }
        public EntityStatus Status { get; set; }
        public CourseStatus CourseStatus { get; set; }
        public int CourseId { get; set; }
    }
}
