using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Histories
{
    public class DegreeHistory : BaseAuditableEntity
    {
        public StudyField StudyField { get; set; }
        public DegreeType Type { get; set; }
        public string Name { get; set; }
        public EntityStatus Status { get; set; }
        public int DegreeId { get; set; }
    }
}
