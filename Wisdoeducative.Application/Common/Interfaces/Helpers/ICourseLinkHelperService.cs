using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface ICourseLinkHelperService
    {
        bool ValidateCourseLink(CourseLinkDto courseLink);
    }
}
