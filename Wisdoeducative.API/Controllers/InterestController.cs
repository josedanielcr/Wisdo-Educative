using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Microsoft.OpenApi.Writers;
using System;
using Wisdoeducative.API.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class InterestController : ControllerBase
    {
        private readonly IInterestService interestService;
        private readonly IControllerHelper controllerHelper;
        private readonly Dictionary<string, string> requiredScopes;
        
        public InterestController(IInterestService interestService,
            IControllerHelper controllerHelper)
        {
            this.interestService = interestService;
            this.controllerHelper = controllerHelper;
            this.requiredScopes = controllerHelper.LoadRequiredScopes();
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateInterest([FromBody] InterestDto interest)
        {
            controllerHelper.HasRequiredScopes(requiredScopes, HttpContext);
            return Ok(await interestService.CreateInterest(interest));
        }

    }
}