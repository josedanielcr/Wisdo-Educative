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
        public StudyPlanTerm StudyPlanTerm { get; set; }
        public int StudyPlanTermId { get; set; }
        public string Name { get; set; }
        public bool IsFavorite { get; set; } = false;
        public int TotalCredits { get; set; }
        public string? CurrentScore { get; set; }
        public EntityStatus status { get; set; }
        public CourseStatus CourseStatus { get; set; }
    }
}
