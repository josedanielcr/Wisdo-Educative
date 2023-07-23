using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Microsoft.OpenApi.Writers;
using System;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [ApiController]
    [RequiredScope("api.wisdoeducative.read", "api.wisdoeducative.write")]
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

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserInterests(int userId)
        {
            return Ok(await interestService.GetUserInterests(userId));
        }

        //create get interests method
        [HttpGet]
        public async Task<IActionResult> GetInterests()
        {
            return Ok(await interestService.GetInterests());
        }
    }
}