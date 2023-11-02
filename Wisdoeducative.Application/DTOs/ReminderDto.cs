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
    public class ReminderDto : IMapFrom<Reminder>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CourseEvaluationTaskDto? CourseEvaluationTask { get; set; }
        public int CourseEvaluationTaskId { get; set; }
        public DateTime? Date { get; set; }
        public string? Status { get; set; }
        public bool IsCompleted { get; set; } = false;
    }
}
