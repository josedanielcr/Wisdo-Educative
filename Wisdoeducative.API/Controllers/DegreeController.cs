using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [RequiredScope("api.wisdoeducativedev.read", "api.wisdoeducativedev.write")]
    [ApiController]
    [Route("[controller]")]
    public class DegreeController : ControllerBase
    {
        private readonly IDegreeService degreeService;
        public DegreeController(IDegreeService degreeService)
        {
            this.degreeService = degreeService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateDegree([FromBody] DegreeDto degree)
        {
            return Ok(await degreeService.CreateDegree(degree));
        }

        [HttpPost("setup")]
        public async Task<IActionResult> SetupUserDegree([FromBody] UserDegreeConfigDTO userDegreeConfig)
        {
            return Ok(await degreeService.SetupUserDegree(userDegreeConfig));
        }
    }
}