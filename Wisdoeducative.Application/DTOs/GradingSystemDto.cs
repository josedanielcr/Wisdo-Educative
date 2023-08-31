using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.DTOs
{
    public class GradingSystemDto : IMapFrom<GrandingSystem>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string MinimumScore { get; set; }
        public string MaximiumScore { get; set; }
        public string PassingGrade { get; set; }
        public string Status { get; set; }
    }
}