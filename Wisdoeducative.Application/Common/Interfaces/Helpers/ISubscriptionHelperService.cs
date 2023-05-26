using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.enums;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface ISubscriptionHelperService
    {
        Task<SubscriptionDto?> GetSubscriptionById(int subscriptionId);
        Task<SubscriptionDto?> GetSubscriptionByUserId(int userId);
        Task<SubscriptionDto?> GetSubscriptionByUserEmail(string email);
        Task<SubscriptionDto?> GetSubscriptionByName(SubscriptionNames subscriptionName);

        Task<Boolean> IsTransactionValid(UserSubscriptionTransactionDto transaction);
    }
}
