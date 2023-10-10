using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class CourseEvaluationTask : BaseEntity
    {
        public CourseEvaluation? CourseEvaluation { get; set; }
        public int CourseEvaluationId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Weight { get; set; }
        public int? TotalScore { get; set; }
        public EntityStatus Status { get; set; }
        public CourseEvaluationStatus EvaluationStatus { get; set; }
    }
}
