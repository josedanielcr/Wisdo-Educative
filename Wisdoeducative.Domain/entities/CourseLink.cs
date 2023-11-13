using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class CourseLink : BaseEntity
    {
        public CourseEvaluationTask? CourseEvaluationTask { get; set; }
        public int CourseEvaluationTaskId { get; set; }
        public string Link { get; set; }
        public string Name { get; set; }
        public CourseLinkPlatform Platform { get; set; }
        public EntityStatus Status { get; set; }
    }
}
