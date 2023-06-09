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
    public class InstitutionDto : IMapFrom<Institution>
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Country { get; set; }
        public string? CountryCode { get; set; }
        public string? WebSite { get; set; }
        public EntityStatus Status { get; set; }
    }
}