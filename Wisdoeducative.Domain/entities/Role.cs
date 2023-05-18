using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class Role : BaseEntity
    {
        public UserRoles Name { get; set; }
        public string Description { get; set; }
        public EntityStatus Status { get; set; }
    }
}
