using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.DTOs
{
    public class CourseEvaluationDto : IMapFrom<CourseEvaluation>
    {
        public int Id { get; set; }
        public CourseDto? CourseDto { get; set; } 
        public int CourseId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int Weight { get; set; }
        public string? Status { get; set; }
    }
}
