using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class Institution : BaseEntity
    {
        public string? Name { get; set; }
        public string? Country { get; set; }
        public string? CountryCode { get; set; }
        public string? WebSite { get; set; }
        public EntityStatus Status { get; set; }
    }
}