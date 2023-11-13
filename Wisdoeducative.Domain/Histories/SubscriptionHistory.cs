using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Histories
{
    public class SubscriptionHistory : BaseAuditableEntity
    {
        public SubscriptionNames Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public EntityStatus Status { get; set; }
        public int SubscriptionId { get; set; }
    }
}