using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.Services;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [ApiController]
    [RequiredScope("api.wisdoeducative.read", "api.wisdoeducative.write")]
    [Route("[controller]")]
    public class StudyPlanExtractionController : ControllerBase
    {
        private readonly IStudyPlanExtractionService studyPlanExtractionService;

        public StudyPlanExtractionController(IStudyPlanExtractionService studyPlanExtractionService)
        {
            this.studyPlanExtractionService = studyPlanExtractionService;
        }

        [HttpPost("{userDegreeId}")]
        public async Task<IActionResult> ExtractStudyPlan(int userDegreeId, IFormFile studyPlanFile)
        {
            return Ok(await studyPlanExtractionService.ExtractStudyPlan(userDegreeId, studyPlanFile));
        }
    }
}