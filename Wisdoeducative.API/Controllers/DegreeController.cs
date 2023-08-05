using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [ApiController]
    [RequiredScope("api.wisdoeducative.read", "api.wisdoeducative.write")]
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

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserDegree(int userId)
        {
            return Ok(await degreeService.GetUserDegrees(userId));
        }
    }
}