using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Exceptions;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Helpers
{
    public class InstitutionHelperService : IInstitutionHelperService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;

        public InstitutionHelperService(IApplicationDBContext dBContext,
            IMapper mapper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
        }

        public async Task<InstitutionDto> GetInstitutionById(int institutionId)
        {
            var dbInstitution = await dBContext.Institutions
                .Where(x => x.Id == institutionId)
                .FirstOrDefaultAsync();

            return dbInstitution == null
                ? throw new NotFoundException($"{ErrorMessages.EntityNotFound} Institution")
                : mapper.Map<InstitutionDto>(dbInstitution);
        }
    }
}