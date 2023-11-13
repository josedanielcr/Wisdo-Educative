using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class GrandingSystem : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string MinimumScore { get; set; }
        public string MaximiumScore { get; set; }
        public string PassingGrade { get; set; }
        public EntityStatus Status { get; set; }
    }
}