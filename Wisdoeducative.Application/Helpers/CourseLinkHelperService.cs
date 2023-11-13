using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Helpers
{
    public class CourseLinkHelperService : ICourseLinkHelperService
    {
        private readonly IEntityHelperService entityHelperService;

        public CourseLinkHelperService(IEntityHelperService entityHelperService)
        {
            this.entityHelperService = entityHelperService;
        }
        public bool ValidateCourseLink(CourseLinkDto course)
        {
            string[] propertiesToCheck = new string[] { "CourseEvaluationTaskId", "Link", "Platform", "Name" };
            if (entityHelperService.AreAnyPropertiesNull(course, propertiesToCheck))
            {
                return false;
            }
            return true;
        }
    }
}
