using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Exceptions;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Helpers
{
    public class SubscriptionHelperService : ISubscriptionHelperService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IEntityHistoryService<UserSubscription> userSubscriptionHistory;

        public SubscriptionHelperService(IApplicationDBContext dBContext, 
            IMapper mapper,
            IEntityHistoryService<UserSubscription> userSubscriptionHistory)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.userSubscriptionHistory = userSubscriptionHistory;
        }

        public async Task<SubscriptionDto?> GetSubscriptionById(int subscriptionId)
        {
            var subscription = await dBContext.Subscriptions
               .Where(Subs => Subs.Id == subscriptionId)
               .FirstOrDefaultAsync();

            if (subscription == null)
            {
                return null;
            }

            return mapper.Map<SubscriptionDto>(subscription);
        }

        public async Task<SubscriptionDto?> GetSubscriptionByName(SubscriptionNames subscriptionName)
        {
            var subscription = await dBContext.Subscriptions
                .Where(Subs => Subs.Name == subscriptionName)
                .FirstOrDefaultAsync();

            if (subscription == null)
            {
                return null;
            }

            return mapper.Map<SubscriptionDto>(subscription);
        }

        public async Task<SubscriptionDto> GetSubscriptionByUserId(int userId)
        {
            var subscription = await dBContext.UserSubscriptions
                .Where(userSubs => userSubs.UserId == userId)
                .Include(userSubs => userSubs.Subscription)
                .FirstOrDefaultAsync();
            
            if(subscription == null)
            {
                throw new NotFoundException($"{ErrorMessages.EntityNotFound}", "EntityNotFound");
            }

            return mapper.Map<SubscriptionDto>(subscription.Subscription);
        }

        public async Task SaveUserSubscriptionHistory(UserSubscription userSubscription,
            int userSubscriptionId, EntityChangeTypes changeType, string modifiedBy)
        {
            await userSubscriptionHistory.SaveChanges(userSubscription, userSubscriptionId, changeType, modifiedBy);
        }
    }
}
