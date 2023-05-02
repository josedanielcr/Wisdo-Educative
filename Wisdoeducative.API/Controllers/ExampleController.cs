using Microsoft.AspNetCore.Mvc;

namespace Wisdoeducative.API.Controllers
{
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
            return Ok(new DateTime());
        }
    }
}
