﻿using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.DTOs
{
    public class StudyPlanTermDto : IMapFrom<StudyPlanTerm>
    {
        public int? Id { get; set; }
        public StudyPlanDTO? StudyPlanDTO { get; set; }
        public int StudyPlanId { get; set; }
        public string Name { get; set; }
        public int? PeriodNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? StudyTermStatus { get; set; }
        public int? TotalCredits { get; set; }
        public int? CurrentProgress { get; set; }
        public string? Status { get; set; }
    }
}
