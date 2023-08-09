using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Services;

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
    }
}