using AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Services;

namespace Wisdoeducative.Application.Services
{
    public class StudyPlanExtractionService : IStudyPlanExtractionService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;

        public StudyPlanExtractionService(IApplicationDBContext dBContext,
            IMapper mapper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
        }

        public Task<string> ExtractStudyPlan(int userDegreeId, IFormFile studyPlanFile)
        {
            return null;
        }
    }
}
