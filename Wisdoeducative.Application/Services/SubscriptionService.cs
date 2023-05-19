using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Services;

namespace Wisdoeducative.Application.Services
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;

        public SubscriptionService(IApplicationDBContext dBContext, IMapper mapper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
        }
    }
}