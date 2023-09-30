using System;
using System.Collections.Generic;
using System.Diagnostics.SymbolStore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface ICourseEvaluationHelperService
    {
        bool IsCourseEvaluationCreationDataValid(CourseEvaluation courseEvaluation);
        bool IsCourseEvalutionTaskCreationDataValid(CourseEvaluationTask courseEvaluationTask);
    }
}
