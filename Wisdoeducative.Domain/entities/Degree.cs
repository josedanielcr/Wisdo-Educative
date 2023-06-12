using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class Degree : BaseEntity
    {
        public string Name { get; set; }
        public StudyField StudyField { get; set; }
        public DegreeType Type { get; set; }
        public EntityStatus Status { get; set; }
    }
}