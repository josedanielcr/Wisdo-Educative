using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.enums;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class Subscription : BaseEntity
    {
        public SubscriptionNames Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public EntityStatus Status { get; set; }
    }
}