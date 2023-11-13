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
            string[] propertiesToCheck = new string[] { "CourseId", "Name", "Weight" };
            if (entityHelperService.AreAnyPropertiesNull(courseEvaluation, propertiesToCheck))
            {
                return false;
            }
            return true;
        }

        public bool IsCourseEvaluationTaskDatesValid(CourseEvaluationTaskDto courseEvaluationTaskDto)
        {
            if(courseEvaluationTaskDto.StartDate > courseEvaluationTaskDto.EndDate)
            {
                return false;
            }
            return true;
        }

        public bool IsCourseEvaluationTaskWeightValid(IEnumerable<CourseEvaluationTaskDto> courseEvaluationTasks, int newWeight, CourseEvaluationDto courseEvaluationDto)
        {
            int total = newWeight;
            foreach (var courseEvaluationTask in courseEvaluationTasks)
            {
                total += courseEvaluationTask.Weight;
            }
            if (total > courseEvaluationDto.Weight)
            {
                return false;
            }
            return true;
        }

        public bool IsCourseEvaluationWeightValid(IEnumerable<CourseEvaluationDto> courseEvaluations,
            int newWeight)
        {
            int total = newWeight;
            foreach (var courseEvaluation in courseEvaluations)
            {
                total += courseEvaluation.Weight;
            }
            if(total > 100)
            {
                return false;
            }
            return true;
        }

        public bool IsCourseEvalutionTaskCreationDataValid(CourseEvaluationTask courseEvaluationTask)
        {
            string[] propertiesToCheck = new string[] { "Weight", "Name", "StartDate", "EndDate" };
            if (entityHelperService.AreAnyPropertiesNull(courseEvaluationTask, propertiesToCheck))
            {
                return false;
            }
            return true;
        }
    }
}
