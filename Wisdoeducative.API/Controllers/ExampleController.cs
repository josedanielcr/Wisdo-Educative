using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System.Security.Claims;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [RequiredScope("api.wisdoeducativedev.read")]
    [ApiController]
    [Route("[controller]")]
    public class ExampleController : ControllerBase
    {
        private readonly ILogger<ExampleController> _logger;
        private readonly IHttpContextAccessor contextAccessor;

        public ExampleController(ILogger<ExampleController> logger,
            IHttpContextAccessor contextAccessor)
        {
            _logger = logger;
            this.contextAccessor = contextAccessor;
        }

        [HttpGet]
        public ActionResult Get()
        {
            ClaimsPrincipal user = HttpContext.User;
            // Get all claims
            var claims = user.Claims.ToList();

            // Return the claims as JSON
            return Ok(claims);
        }
    }
}
