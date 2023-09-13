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
    public class StudyPlanController : ControllerBase
    {
        private readonly IStudyPlanService studyPlanService;
        private readonly IStudyPlanTermService studyPlanTermService;

        public StudyPlanController(IStudyPlanService studyPlanService,
            IStudyPlanTermService studyPlanTermService)
        {
            this.studyPlanService = studyPlanService;
            this.studyPlanTermService = studyPlanTermService;
        }

        [HttpGet("{studyPlanId}")]
        public async Task<IActionResult> GetUserStudyPlan(int studyPlanId)
        {
            return Ok(await studyPlanService.GetUserStudyPlan(studyPlanId));
        }

        [HttpGet("user-degree/{userDegreeId}")]
        public async Task<IActionResult> GetUserStudyPlanByUserDegree(int userDegreeId)
        {
            return Ok(await studyPlanService.GetUserStudyPlanByUserDegreeId(userDegreeId));
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudyPlan(StudyPlanDTO studyPlan)
        {
            return Ok(await studyPlanService.CreateStudyPlan(studyPlan));
        }

        [HttpPost("study-plan-term")]
        public async Task<IActionResult> CreateStudyPlanTerm([FromBody] StudyTermCreationDto studyTermCreationDto)
        {
            return Ok(await studyPlanTermService.CreateStudyPlanTerm(studyTermCreationDto));
        }

        [HttpGet("study-plan-terms/{studyPlanId}")]
        public async Task<IActionResult> GetUserStudyPlanTerms(int studyPlanId)
        {
            return Ok(await studyPlanTermService.GetUserStudyPlanTerms(studyPlanId));
        }
    }
}