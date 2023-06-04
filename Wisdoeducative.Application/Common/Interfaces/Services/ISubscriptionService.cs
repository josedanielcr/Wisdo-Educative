using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.enums;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface ISubscriptionService
    {
        Task LinkSubscriptionToAccount(SubscriptionNames subscription, int userId);
    }
}