using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Services;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [ApiController]
    [RequiredScope("api.wisdoeducative.read", "api.wisdoeducative.write")]
    [Route("[controller]")]
    public class UserStatisticsController : ControllerBase
    {
        private readonly IUserStatisticsService userStatisticsService;

        public UserStatisticsController(IUserStatisticsService userStatisticsService)
        {
            this.userStatisticsService = userStatisticsService;
        }

        [HttpGet("statistics/{userId}")]
        public async Task<IActionResult> GetUserStatisticsAsync(int userId)
        {
            return Ok(await userStatisticsService.GetUserStatisticsAsync(userId));
        }
    }
}
