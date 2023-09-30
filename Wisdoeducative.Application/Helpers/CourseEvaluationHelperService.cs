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
    public class CourseEvaluationHelperService : ICourseEvaluationHelperService
    {
        private readonly IEntityHelperService entityHelperService;

        public CourseEvaluationHelperService(IEntityHelperService entityHelperService)
        {
            this.entityHelperService = entityHelperService;
        }
        public bool IsCourseEvaluationCreationDataValid(CourseEvaluation courseEvaluation)
        {
            string[] propertiesToCheck = new string[] { "Weight", "Name" };
            if (entityHelperService.AreAnyPropertiesNull(courseEvaluation, propertiesToCheck))
            {
                return false;
            }
            return true;
        }

        public bool IsCourseEvalutionTaskCreationDataValid(CourseEvaluationTask courseEvaluationTask)
        {
            string[] propertiesToCheck = new string[] { "CourseEvaluationId", "Name", "Weight" };
            if (entityHelperService.AreAnyPropertiesNull(courseEvaluationTask, propertiesToCheck))
            {
                return false;
            }
            return true;
        }
    }
}
