using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [ApiController]
    [RequiredScope("api.wisdoeducative.read", "api.wisdoeducative.write")]
    [Route("[controller]")]
    public class StudyPlanController : ControllerBase
    {
        private readonly IStudyPlanService studyPlanService;

        public StudyPlanController(IStudyPlanService studyPlanService)
        {
            this.studyPlanService = studyPlanService;
        }

        [HttpGet("{userDegreeId}")]
        public async Task<IActionResult> GetUserStudyPlan(int userDegreeId)
        {
            return Ok(await studyPlanService.GetUserStudyPlan(userDegreeId));
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudyPlan(StudyPlanDTO studyPlan)
        {
            return Ok(await studyPlanService.CreateStudyPlan(studyPlan));
        }

        [HttpPost("studyPlanTerm")]
        public async Task<IActionResult> CreateStudyPlanTerm([FromBody] StudyTermCreationDto studyTermCreationDto)
        {
            return Ok(await studyPlanService.CreateStudyPlanTerm(studyTermCreationDto));
        }
    }
}