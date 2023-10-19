using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class Pomodoro : BaseEntity
    {
        public CourseEvaluationTask? courseEvaluationTask { get; set; }
        public int CourseEvaluationTaskId { get; set; }
        public DateTime InitialTime { get; set; }
        public DateTime EndTime { get; set; }
        public PomodoroStatus Status { get; set; }
    }
}
