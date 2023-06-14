using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.Services;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [ApiController]
    [RequiredScope("api.wisdoeducative.read", "api.wisdoeducative.write")]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDto user)
        {
            return Ok(await userService.CreateUser(user));
        }

        [HttpPost]
        [Route("configuration")]
        public async Task<IActionResult> SetUserConfiguration([FromBody] UserDto userConfiguration)
        {
            return Ok(await userService.SetUserData(userConfiguration));
        }

        [HttpPost]
        [Route("{userId}/interests")]
        public async Task<IActionResult> SetUserInterests(int userId,
            [FromBody] List<InterestDto> interests)
        {
            return Ok(await userService.SetUserInterests(userId, interests));
        }
    }
}