using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class CourseEvaluation : BaseEntity
    {
        public Course Course { get; set; }
        public int CourseId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Weight { get; set; }
        public EntityStatus status { get; set; }
        public CourseEvaluationStatus EvaluationStatus { get; set; }
    }
}
