using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.DTOs
{
    public class UserSubscriptionTransactionDto : IMapFrom<UserSubscriptionTransactionDto>
    {
        public int Id { get; set; }
        public int? UserSubscriptionId { get; set; }
        public UserSubscriptionDto? UserSubscription { get; set; }
        public float Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionReference { get; set; }
        public string Currency { get; set; }
        public string PaymentStatus { get; set; }
        public string? Status { get; set; }
    }
}