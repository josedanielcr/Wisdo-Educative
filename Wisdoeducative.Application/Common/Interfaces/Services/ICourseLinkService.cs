﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface ICourseLinkService
    {
        Task<CourseLinkDto> GetCourseLink(int courseId);
        Task<CourseLinkDto> CreateCourseLink(CourseLinkDto courseLink);
        Task<CourseLinkDto> GetCourseLinkById(int CourseLinkId);
    }
}