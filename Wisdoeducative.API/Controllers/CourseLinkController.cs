﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Identity.Web.Resource;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;

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

        [HttpPost]
        public async Task<IActionResult> CreateCourseLink(CourseLinkDto courseLinkDto)
        {
            return Ok(await courseLink.CreateCourseLink(courseLinkDto));
        }
    }
}