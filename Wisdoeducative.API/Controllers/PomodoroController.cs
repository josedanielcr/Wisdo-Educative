using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [ApiController]
    [RequiredScope("api.wisdoeducative.read", "api.wisdoeducative.write")]
    [Route("[controller]")]
    public class PomodoroController : ControllerBase
    {
        private readonly IPomodoroService pomodoroService;

        public PomodoroController(IPomodoroService pomodoroService)
        {
            this.pomodoroService = pomodoroService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePomodoroSession([FromBody] PomodoroDto pomodoroDto)
        {
            await pomodoroService.CreatePomodoroSession(pomodoroDto);
            return Ok();
        }
    }
}
