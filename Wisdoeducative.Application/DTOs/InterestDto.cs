using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.DTOs
{
    public class InterestDto : IMapFrom<Interest>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Status { get; set; }
    }
}