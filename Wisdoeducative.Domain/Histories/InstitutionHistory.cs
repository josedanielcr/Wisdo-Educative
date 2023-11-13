using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Histories
{
    public class InstitutionHistory : BaseAuditableEntity
    {
        public string? Name { get; set; }
        public string? Country { get; set; }
        public string? CountryCode { get; set; }
        public string? WebSite { get; set; }
        public int InstitutionId { get; set; }
        public EntityStatus Status { get; set; }
    }
}