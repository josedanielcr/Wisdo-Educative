using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class SubscriptionRoleMenuOption : BaseEntity
    {
        public Role? Role { get; set; }
        public int RoleId { get; set; }
        public MenuOption? MenuOption { get; set; }
        public int MenuOptionId { get; set; }
        public Subscription? Subscription { get; set; }
        public int SubscriptionId { get; set; }
        public EntityStatus Status { get; set; }
    }
}
