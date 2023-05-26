using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class UserSubscription : BaseEntity
    {
        public User? User { get; set; }
        public int UserId { get; set; }
        public Subscription? Subscription { get; set; }
        public int SubscriptionId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime NextPayment { get; set; }
        public DateTime LastPayment { get; set; }
        public SubscriptionStatus Status { get; set; }

        public UserSubscription(int userId, int subscriptionId, DateTime startDate,
                            DateTime nextPayment, DateTime lastPayment, SubscriptionStatus status)
        {
            UserId = userId;
            SubscriptionId = subscriptionId;
            StartDate = startDate;
            NextPayment = nextPayment.AddMonths(1);
            LastPayment = lastPayment;
            Status = status;
        }
    }
}