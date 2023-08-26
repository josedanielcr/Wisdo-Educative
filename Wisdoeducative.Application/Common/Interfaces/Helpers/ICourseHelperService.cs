using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface ICourseHelperService
    {
        bool ValidateCourseBeforeCreation(CourseDto courseDto);

        Course CreateNewCourseFromDto(CourseDto courseDto);
    }
}
