using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Domain.Histories
{
    public class RoleHistory : BaseAuditableEntity
    {
        public Role? ChangedRole { get; set; }
        public int ChangedRoleId { get; set; }
    }
}
