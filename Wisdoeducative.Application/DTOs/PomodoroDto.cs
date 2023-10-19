using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.DTOs
{
    public class PomodoroDto : IMapFrom<Pomodoro>
    {
        public int Id { get; set; }
        public CourseEvaluationTaskDto? CourseEvaluationTask { get; set; }
        public int CourseEvaluationTaskId { get; set; }
        public DateTime InitialTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Status { get; set; }
    }
}
