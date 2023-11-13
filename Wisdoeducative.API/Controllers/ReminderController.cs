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
    public class ReminderController : ControllerBase
    {
        private readonly IReminderService reminderService;

        public ReminderController(IReminderService reminderService)
        {
            this.reminderService = reminderService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReminderAsync(ReminderDto reminderDto)
        {
            var result = await reminderService.CreateReminderAsync(reminderDto);
            return Ok(result);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReminderAsync(int id)
        {
            await reminderService.DeleteReminderAsync(id);
            return Ok();

        }

        [HttpGet("all/{studyPlanId}")]
        public async Task<IActionResult> GetAllRemindersAsync(int studyPlanId)
        {
            var result = await reminderService.GetAllRemindersAsync(studyPlanId);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReminderByIdAsync(int id)
        {
            var result = await reminderService.GetReminderByIdAsync(id);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateReminderAsync(ReminderDto reminderDto)
        {
            var result = await reminderService.UpdateReminderAsync(reminderDto);
            return Ok(result);
        }
    }
}