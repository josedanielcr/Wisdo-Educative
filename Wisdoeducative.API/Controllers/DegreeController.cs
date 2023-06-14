using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.API.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DegreeController : ControllerBase
    {
        private readonly IDegreeService degreeService;
        private readonly IControllerHelper controllerHelper;
        private readonly Dictionary<string, string> requiredScopes;
        public DegreeController(IDegreeService degreeService,
            IControllerHelper controllerHelper)
        {
            this.degreeService = degreeService;
            this.controllerHelper = controllerHelper;
            this.requiredScopes = controllerHelper.LoadRequiredScopes();
        }

        [HttpPost]
        public async Task<IActionResult> CreateDegree([FromBody] DegreeDto degree)
        {
            controllerHelper.HasRequiredScopes(requiredScopes, HttpContext);
            return Ok(await degreeService.CreateDegree(degree));
        }

        [HttpPost("setup")]
        public async Task<IActionResult> SetupUserDegree([FromBody] UserDegreeConfigDTO userDegreeConfig)
        {
            controllerHelper.HasRequiredScopes(requiredScopes, HttpContext);
            return Ok(await degreeService.SetupUserDegree(userDegreeConfig));
        }
    }
}