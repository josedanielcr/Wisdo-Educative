using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.Services;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [RequiredScope("api.wisdoeducativedev.read", "api.wisdoeducativedev.write")]
    [ApiController]
    [Route("[controller]")]
    public class InterestController : ControllerBase
    {
        private readonly IInterestService interestService;

        public InterestController(IInterestService interestService)
        {
            this.interestService = interestService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateInterest([FromBody] InterestDto interest)
        {
            return Ok(await interestService.CreateInterest(interest));
        }

    }
}
