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
using Wisdoeducative.Domain.Enums;

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

        public async Task<InstitutionDto> CreateInstituionByName(string name)
        {
            if(name == null){
                throw new BadRequestException($"{ErrorMessages.NullProperties}");
            }
            var institution = await ValidateInstitutionByName(name)!;
            if(institution != null)
            {
                return institution;
            }
            var newInstitution = new Institution();
            newInstitution.Name = name;
            newInstitution.Status = EntityStatus.Active;
            dBContext.Institutions.Add(newInstitution);
            await dBContext.SaveChangesAsync(); //needed to get the id for the userDegree setup
            return mapper.Map<InstitutionDto>(newInstitution);
        }

        public async Task<InstitutionDto> GetInstitutionById(int institutionId)
        {
            var dbInstitution = await dBContext.Institutions
                .Where(x => x.Id == institutionId)
                .FirstOrDefaultAsync();

            return dbInstitution == null
                ? throw new NotFoundException($"{ErrorMessages.EntityNotFound}")
                : mapper.Map<InstitutionDto>(dbInstitution);
        }

        public async Task<InstitutionDto>? ValidateInstitutionByName(string name)
        {
            var institutionName = name.ToUpper();
            var dbInstitution = await dBContext.Institutions
                .Where(ins => ins.Name != null && ins.Name.ToUpper().Contains(institutionName))
                .FirstOrDefaultAsync();
            if(dbInstitution != null)
            {
                return mapper.Map<InstitutionDto>(dbInstitution);
            }
            return null;
        }
    }
}