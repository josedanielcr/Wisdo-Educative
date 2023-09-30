﻿using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.DTOs
{
    public class CourseEvaluationTaskDto : IMapFrom<CourseEvaluationTask>
    {
        public int Id { get; set; }
        public CourseEvaluationDto CourseEvaluationDto { get; set; }
        public int CourseEvaluationId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Weight { get; set; }
        public string Status { get; set; }
        public string EvaluationStatus { get; set; }
    }
}
