using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class StudyPlanTerm : BaseEntity
    {
        public StudyPlan StudyPlan { get; set; }
        public int StudyPlanId { get; set; }
        public int PeriodNumber { get; set; }
        public StudyTermStatus StudyTermStatus { get; set; }
        public EntityStatus Status { get; set; }
    }
}