using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.API.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.Services;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IControllerHelper controllerHelper;
        private readonly Dictionary<string, string> requiredScopes;

        public UserController(IUserService userService,
            IControllerHelper controllerHelper)
        {
            this.userService = userService;
            this.controllerHelper = controllerHelper;
            this.requiredScopes = controllerHelper.LoadRequiredScopes();
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDto user)
        {
            controllerHelper.HasRequiredScopes(requiredScopes, HttpContext);
            return Ok(await userService.CreateUser(user));
        }

        [HttpPost]
        [Route("configuration")]
        public async Task<IActionResult> SetUserConfiguration([FromBody] UserDto userConfiguration)
        {
            controllerHelper.HasRequiredScopes(requiredScopes, HttpContext);
            return Ok(await userService.SetUserData(userConfiguration));
        }

        [HttpPost]
        [Route("{userId}/interests")]
        public async Task<IActionResult> SetUserInterests(int userId,
            [FromBody] List<InterestDto> interests)
        {
            controllerHelper.HasRequiredScopes(requiredScopes, HttpContext);
            return Ok(await userService.SetUserInterests(userId, interests));
        }
    }
}