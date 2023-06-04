using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.enums;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class UserSubscriptionTransaction : BaseEntity
    {
        public UserSubscription UserSubscription { get; set; }
        public int UserSubscriptionId { get; set; }
        public float Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string? TransactionReference { get; set; }
        public TransactionCurrency Currency { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public EntityStatus Status { get; set; }
    }
}