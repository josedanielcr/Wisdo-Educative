using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.DTOs
{
    public class UserSubscriptionDto : IMapFrom<UserSubscription>
    {
        public int Id { get; set; }
        public UserDto User { get; set; }
        public int UserId { get; set; }
        public SubscriptionDto Subscription { get; set; }
        public int SubscriptionId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
    }
}