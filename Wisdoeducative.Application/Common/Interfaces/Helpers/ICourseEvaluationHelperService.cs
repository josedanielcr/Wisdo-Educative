using System;
using System.Collections.Generic;
using System.Diagnostics.SymbolStore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface ICourseEvaluationHelperService
    {
        bool IsCourseEvaluationCreationDataValid(CourseEvaluation courseEvaluation);
        bool IsCourseEvaluationWeightValid(IEnumerable<CourseEvaluationDto> courseEvaluations,
            int newWeight);
        bool IsCourseEvalutionTaskCreationDataValid(CourseEvaluationTask courseEvaluationTask);
    }
}
