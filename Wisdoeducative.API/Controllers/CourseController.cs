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
    public class CourseController : ControllerBase
    {
        private readonly ICourseService courseService;

        public CourseController(ICourseService courseService)
        {
            this.courseService = courseService;
        }

        [HttpGet("{studyTermId}")]
        public async Task<IActionResult> GetStudyTermCourses(int studyTermId)
        {
            return Ok(await courseService.GetStudyTermCourses(studyTermId));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCourse(CourseDto course)
        {
            return Ok(await courseService.CreateCourse(course));
        }
    }
}