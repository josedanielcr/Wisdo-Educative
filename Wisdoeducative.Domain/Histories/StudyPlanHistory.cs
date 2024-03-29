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
    public class StudyPlanHistory : BaseAuditableEntity
    {
        public UserDegree? UserDegree { get; set; }
        public int UserDegreeId { get; set; }
        public GrandingSystem? GrandingSystem { get; set; }
        public int? GradingSystemId { get; set; }
        public int? TotalCredits { get; set; }
        public int? EarnedCredits { get; set; }
        public EntityStatus Status { get; set; }
    }
}