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
    public class CourseController : ControllerBase
    {
        private readonly ICourseService courseService;

        public CourseController(ICourseService courseService)
        {
            this.courseService = courseService;
        }

        [HttpGet("{courseId}")]
        public async Task<IActionResult> GetCourse(int courseId)
        {
            return Ok(await courseService.GetCourseById(courseId));
        }

        [HttpGet("study-plan-term/{studyTermId}")]
        public async Task<IActionResult> GetStudyTermCourses(int studyTermId)
        {
            return Ok(await courseService.GetStudyTermCourses(studyTermId));
        }

        [HttpGet("study-plan/{studyPlanId}")]
        public async Task<IActionResult> GetStudyPlanCourses(int studyPlanId)
        {
            return Ok(await courseService.GetStudyPlanCourses(studyPlanId));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCourse(List<CourseDto> courses)
        {
            return Ok(await courseService.CreateCourse(courses));
        }

        [HttpPost("search/{studyPlanId}")]
        public async Task<IActionResult> SearchCourses(int studyPlanId, SearchCourseDto searchCourseModel)
        {
            return Ok(await courseService.SearchCourses(studyPlanId, searchCourseModel));
        }

        [HttpPost("add-favorite/{courseId}")]
        public async Task<IActionResult> AddFavoriteCourse(int courseId)
        {
            return Ok(await courseService.AddFavoriteCourse(courseId));
        }

        [HttpPut("set-grade/{courseId}")]
        public async Task<IActionResult> SetGrade(int courseId, [FromBody] CourseGrade grade)
        {
            return Ok(await courseService.SetGrade(courseId, grade));
        }
    }
}