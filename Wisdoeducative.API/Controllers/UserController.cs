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
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> logger;
        private readonly IUserService userService;

        public UserController(ILogger<UserController> logger, 
               IUserService userService)
        {
            this.logger = logger;
            this.userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDto user)
        {
            return Ok(await userService.CreateUser(user));
        }
    }
}