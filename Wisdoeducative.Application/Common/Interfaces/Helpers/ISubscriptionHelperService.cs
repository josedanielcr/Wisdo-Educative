using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface ISubscriptionHelperService
    {
        Task<SubscriptionDto?> GetSubscriptionById(int subscriptionId);
        Task<SubscriptionDto?> GetSubscriptionByName(SubscriptionNames subscriptionName);
        Task SaveUserSubscriptionHistory(UserSubscription userSubscription,
            int userSubscriptionId, EntityChangeTypes changeType, string modifiedBy);
        Task<SubscriptionDto> GetSubscriptionByUserId(int userId);
    }
}