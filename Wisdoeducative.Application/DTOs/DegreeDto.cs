using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.DTOs
{
    public class DegreeDto : IMapFrom<Degree>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? StudyField { get; set; }
        public string? Type { get; set; }
        public string? Status { get; set; }
    }
}