using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Services
{
    public class InstitutionService : IInstitutionService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;

        public InstitutionService(IApplicationDBContext dBContext,
            IMapper mapper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<InstitutionDto>> GetInstitutions()
        {
            IEnumerable<Institution> institutions = await dBContext.Institutions.ToListAsync();
            List<InstitutionDto> institutionsDto = new List<InstitutionDto>();
            foreach(Institution institution in institutions)
            {
                institutionsDto.Add(mapper.Map<InstitutionDto>(institution));
            }
            return institutionsDto;
        }
    }
}
