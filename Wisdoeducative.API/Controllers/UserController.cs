using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System.Security.Claims;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;
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

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateUser([FromBody] Object data)
        {
            var Email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "emails")?.Value;
            var Name = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "extension_Name")?.Value;
            var LastName = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "extension_Lastname")?.Value;
            var B2cId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            UserDto user = new() 
            {
                Email = Email ?? null!,
                Name = Name ?? null!,
                LastName = LastName ?? null!,
                B2cId = B2cId ?? null!
            };
            return Ok(await userService.ValidateUser(user));
        }

        [HttpPost]
        [Route("configuration")]
        public async Task<IActionResult> SetUserConfiguration([FromBody] UserSetupDTO userConfiguration)
        {
            return Ok(await userService.UserConfiguration(userConfiguration));
        }

        [HttpPost]
        [Route("omit/{userId}")]
        public async Task<IActionResult> OmitUserSetup(int userId)
        {
            return Ok(await userService.OmitUserSetup(userId));
        }
    }
}