using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class Reminder : BaseEntity
    {
        public string Name { get; set; }
        public CourseEvaluationTask? CourseEvaluationTask { get; set; }
        public int CourseEvaluationTaskId { get; set; }
        public DateTime Date { get; set; }
        public EntityStatus Status { get; set; }
        public bool IsCompleted { get; set; }
    }
}
