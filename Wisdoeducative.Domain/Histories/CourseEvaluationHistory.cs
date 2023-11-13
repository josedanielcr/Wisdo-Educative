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
    public class CourseEvaluationHistory : BaseAuditableEntity
    {
        public Course Course { get; set; }
        public int CourseId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Weight { get; set; }
        public string Status { get; set; }
        public CourseEvaluationStatus EvaluationStatus { get; set; }
        public int CourseEvaluationId { get; set; }
    }

}