using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.DTOs
{
    public class CourseLinkDto : IMapFrom<CourseLink>
    {
        public int Id { get; set; }
        public CourseEvaluationTask? CourseEvaluationTask { get; set; }
        public int CourseEvaluationTaskId { get; set; }
        public string Link { get; set; }
        public string Name { get; set; }
        public string Platform { get; set; }
        public string? Status { get; set; }
    }
}
