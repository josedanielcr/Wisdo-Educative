using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface IStudyPlanExtractionService
    {
        Task<string> ExtractStudyPlan(int userDegreeId, IFormFile studyPlanFile);
    }
}
