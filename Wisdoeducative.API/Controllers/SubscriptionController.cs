using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.API.Controllers
{

    [Authorize]
    [RequiredScope("api.wisdoeducativedev.read", "api.wisdoeducativedev.write")]
    [ApiController]
    [Route("[controller]")]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionService subscriptionService;

        public SubscriptionController(ISubscriptionService subscriptionService)
        {
            this.subscriptionService = subscriptionService;
        }

        [HttpPut("link/{userId}/{subscriptionId}")]
        public async Task<IActionResult> LinkSubscription(int userId, int subscriptionId,
            [FromBody] UserSubscriptionTransactionDto transaction)
        {
            return Ok(await subscriptionService.LinkSubscriptionToAccount(userId,
                subscriptionId, transaction));
        }
    }
}