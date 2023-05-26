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
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.Helpers;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Services
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IUserHelperService userServiceHelper;
        private readonly ISubscriptionHelperService subscriptionHelperService;

        public SubscriptionService(IApplicationDBContext dBContext, 
            IMapper mapper,
            IUserHelperService userServiceHelper,
            ISubscriptionHelperService subscriptionHelperService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.userServiceHelper = userServiceHelper;
            this.subscriptionHelperService = subscriptionHelperService;
        }

        public async Task<SubscriptionDto?> GetSubscription(int subscriptionId)
        {
            var subscription = await dBContext.Subscriptions
                .Where(subs => subs.Id == subscriptionId)
                .FirstOrDefaultAsync();

            if(subscription == null)
            {
                return null;
            }

            return mapper.Map<SubscriptionDto>(subscription);
        }

        public async Task<UserDto> LinkSubscriptionToAccount(int userId, int subscriptionId,
            UserSubscriptionTransactionDto transaction)
        {

            var subscriptionDb = await subscriptionHelperService.GetSubscriptionById(subscriptionId)
                ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound} Subscription={subscriptionId}");

            var userdb = await userServiceHelper.GetUserById(userId) 
                ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound} User={userId}");

            //transaction checker
            
            
            var userSubscription = new UserSubscription(userdb.Id,
                subscriptionDb.Id, DateTime.Now, DateTime.Now, DateTime.Now, SubscriptionStatus.Active);

            dBContext.UserSubscriptions.Add(userSubscription);
            await dBContext.SaveChangesAsync();

            return mapper.Map<UserDto>(userdb);

        }
    }
}