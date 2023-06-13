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
        private readonly ISubscriptionHelperService subscriptionHelper;

        public SubscriptionService(IApplicationDBContext dBContext,
            IMapper mapper,
            ISubscriptionHelperService subscriptionHelper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.subscriptionHelper = subscriptionHelper;
        }

        public async Task LinkSubscriptionToAccount(SubscriptionNames subscription, int userId, string b2cId)
        {
            var subscriptiondb = await subscriptionHelper.GetSubscriptionByName(subscription)
                ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound} " +
                $"Subscription={subscription}");

            var newUserSubscription = new UserSubscription
            {
                UserId = userId,
                SubscriptionId = subscriptiondb.Id,
                StartDate = DateTime.Now,
                EndDate = null,
                Status = SubscriptionStatus.Active,
                LastPayment = DateTime.Now,
                NextPayment = DateTime.Now.AddMonths(1)
            };

            dBContext.UserSubscriptions.Add(newUserSubscription);
            await dBContext.SaveChangesAsync();

            var newUserSubscriptionId = newUserSubscription.Id;
            await LinkTransactionToUserSubscription(newUserSubscriptionId, null);
            await subscriptionHelper.SaveUserSubscriptionHistory(newUserSubscription, newUserSubscriptionId,
                EntityChangeTypes.Added,b2cId);
            await dBContext.SaveChangesAsync();
        }

        public async Task LinkTransactionToUserSubscription(int userSubscriptionId, 
            UserSubscriptionTransaction? transaction)
        {
            if (transaction == null)
            {
                await LinkFreeTransaction(userSubscriptionId);
                return;
            }

            //create method for paid transactions
        }

        public async Task LinkFreeTransaction(int userSubscriptionId)
        {
            var transaction = new UserSubscriptionTransaction
            {
                UserSubscriptionId = userSubscriptionId,
                Amount = 0,
                TransactionDate = DateTime.Now,
                TransactionReference = null,
                Currency = TransactionCurrency.Dollar,
                PaymentStatus = PaymentStatus.Paid,
                Status = EntityStatus.Active
            };

            dBContext.UserSubscriptionTransactions.Add(transaction);
            await dBContext.SaveChangesAsync();
        }
    }
}