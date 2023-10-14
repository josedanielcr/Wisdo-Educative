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
    public class CourseEvaluationController : ControllerBase
    {
        private readonly ICourseEvaluationService courseEvaluationService;

        public CourseEvaluationController(ICourseEvaluationService courseEvaluationService)
        {
            this.courseEvaluationService = courseEvaluationService;
        }

        [HttpPost("{courseId}")]
        public async Task<IActionResult> CreateCourseEvaluation(int courseId,[FromBody] CourseEvaluationDto courseEvaluationDto)
        {
            return Ok(await courseEvaluationService.CreateCourseEvaluation(courseEvaluationDto,courseId));
        }

        [HttpPost("task/{courseEvaluationId}")]
        public async Task<IActionResult> CreateCourseEvaluationTask(int courseEvaluationId, [FromBody] CourseEvaluationTaskDto courseEvaluationTaskDto)
        {
            return Ok(await courseEvaluationService.CreateCourseEvaluationTask(courseEvaluationId, courseEvaluationTaskDto));
        }

        [HttpGet("{courseId}")]
        public async Task<IActionResult> GetAllCourseEvaluations(int courseId)
        {
            return Ok(await courseEvaluationService.GetAllCourseEvaluations(courseId));
        }

        [HttpGet("task/{courseEvaluationId}")]
        public async Task<IActionResult> GetAllCourseEvaluationTasks(int courseEvaluationId)
        {
            return Ok(await courseEvaluationService.GetAllCourseEvaluationTasks(courseEvaluationId));
        }

        [HttpGet("task/course/all/{courseId}")]
        public async Task<IActionResult> GetAllCourseTasks(int courseId)
        {
            return Ok(await courseEvaluationService.GetCourseTasks(courseId));
        }
    }
}
