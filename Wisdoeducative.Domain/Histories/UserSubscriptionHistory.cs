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
    public class UserSubscriptionHistory : BaseAuditableEntity
    {
        public int UserId { get; set; }
        public int SubscriptionId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime NextPayment { get; set; }
        public DateTime LastPayment { get; set; }
        public SubscriptionStatus Status { get; set; }
        public int UserSubscriptionId { get; set; }
    }
}