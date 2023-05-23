using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.enums;

namespace Wisdoeducative.Application.Helpers
{
    public class SubscriptionHelperService : ISubscriptionHelperService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;

        public SubscriptionHelperService(IApplicationDBContext dBContext, 
            IMapper mapper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
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

        public async Task<SubscriptionDto?> GetSubscriptionByUserEmail(string email)
        {
            throw new NotImplementedException();
        }

        public async Task<SubscriptionDto?> GetSubscriptionByUserId(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
