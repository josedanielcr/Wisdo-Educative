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
    public class UserDegreeHistory : BaseAuditableEntity
    {
        public Degree? Degree { get; set; }
        public int DegreeId { get; set; }
        public User? User { get; set; }
        public int UserId { get; set; }
        public Institution? Institution { get; set; }
        public int InstitutionId { get; set; }
        public int CurrentProgress { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsDefault { get; set; }
        public AcademicSchedule Schedule { get; set; }
        public EntityStatus Status { get; set; }
        public int UserDegreeId { get; set; }
    }
}