﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Histories
{
    public class CourseHistory : BaseAuditableEntity
    {
        public StudyPlanTerm StudyPlanTerm { get; set; }
        public int StudyPlanTermId { get; set; }
        public string Name { get; set; }
        public int TotalCredits { get; set; }
        public string? CurrentScore { get; set; }
        public bool IsFavorite { get; set; } = false;
        public EntityStatus Status { get; set; }
        public CourseStatus CourseStatus { get; set; }
        public int CourseId { get; set; }
    }
}
