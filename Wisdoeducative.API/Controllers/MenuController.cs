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
    public class MenuController : ControllerBase
    {
        private readonly IMenuService menuService;

        public MenuController(IMenuService menuService)
        {
            this.menuService = menuService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserMenuOptions(int userId)
        {
            return Ok(await menuService.GetMenuOptions(userId));
        }

        [HttpPost("subscription/{subscriptionId}/role/{roleId}")]
        public async Task<IActionResult> CreateMenuOption([FromBody] MenuOptionDto menuOption,
            int subscriptionId, int roleId)
        {
            return Ok(await menuService.CreateMenuOption(menuOption, subscriptionId, roleId));
        }
    }
}
