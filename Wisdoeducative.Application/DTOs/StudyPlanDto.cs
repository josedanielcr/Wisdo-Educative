using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.DTOs
{
    public class StudyPlanDTO : IMapFrom<StudyPlan>
    {
        public int Id { get; set; }
        public UserDegreeDto UserDegree { get; set; }
        public int UserDegreeId { get; set; }
        public GradingSystemDto GrandingSystem { get; set; }
        public int GradingSystemId { get; set; }
        public int TotalCredits { get; set; }
        public int EarnedCredits { get; set; }
        public string Status { get; set; }
    }
}
