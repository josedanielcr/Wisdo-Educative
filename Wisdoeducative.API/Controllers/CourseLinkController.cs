using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;

namespace Wisdoeducative.API.Controllers
{
    [Authorize]
    [ApiController]
    [RequiredScope("api.wisdoeducative.read", "api.wisdoeducative.write")]
    [Route("[controller]")]
    public class CourseLinkController : ControllerBase
    {
        private readonly ICourseLinkService courseLink;

        public CourseLinkController(ICourseLinkService courseLink)
        {
            this.courseLink = courseLink;
        }

        [HttpGet]
        public async Task<IActionResult> GetCourseLink(int courseId)
        {
            return Ok(await courseLink.GetCourseLink(courseId));
        }

        [HttpGet("course/{CourseId}")]
        public async Task<IActionResult> GetCourseLinkByCourseId(int CourseId)
        {
            return Ok(await courseLink.GetCourseLinkByCourseId(CourseId));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCourseLink(CourseLinkDto courseLinkDto)
        {
            return Ok(await courseLink.CreateCourseLink(courseLinkDto));
        }

        [HttpDelete("{CourseLinkId}")]
        public async Task<IActionResult> DeleteCourseLink(int CourseLinkId)
        {
            return Ok(await courseLink.DeleteCourseLink(CourseLinkId));
        }

        [HttpPut("{CourseLinkId}")]
        public async Task<IActionResult> UpdateCourseLink(int CourseLinkId, CourseLinkDto courseLinkDto)
        {
            return Ok(await courseLink.UpdateCourseLink(CourseLinkId, courseLinkDto));
        }

        [HttpPost("filter")]
        public async Task<IActionResult> GetCourseLinkByFilters([FromBody] CourseLinkFiltersDto courseLinkFiltersDto)
        {
            return Ok(await courseLink.GetCourseLinksByFilters(courseLinkFiltersDto));
        }
    }
}
