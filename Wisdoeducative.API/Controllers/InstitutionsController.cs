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
    public class InstitutionsController : ControllerBase
    {
        private readonly IInstitutionService institutionService;

        public InstitutionsController(IInstitutionService institutionService)
        {
            this.institutionService = institutionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetInstitutions()
        {
            return Ok(await institutionService.GetInstitutions());
        }
    }
}
