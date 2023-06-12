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
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Helpers
{
    public class DegreeHelperService : IDegreeHelperService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IEntityHelperService entityHelper;
        private readonly IUserHelperService userHelperService;
        private readonly IInstitutionHelperService institutionHelperService;

        public DegreeHelperService(IApplicationDBContext dBContext,
            IMapper mapper,
            IEntityHelperService entityHelper,
            IUserHelperService userHelperService,
            IInstitutionHelperService institutionHelperService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.entityHelper = entityHelper;
            this.userHelperService = userHelperService;
            this.institutionHelperService = institutionHelperService;
        }

        public async Task<DegreeDto> GetById(int degreeId)
        {
            var dbDegree = await dBContext.Degrees
                .Where(x => x.Id == degreeId)
                .FirstOrDefaultAsync();

            return dbDegree == null
                ? throw new NotFoundException($"{ErrorMessages.EntityNotFound} Degree")
                : mapper.Map<DegreeDto>(dbDegree);
        }

        public async Task ValidateUserDegreeProperties(UserDegreeConfigDTO userDegree)
        {
            if (entityHelper.AreAnyPropertiesNull(userDegree))
            {
                throw new BadRequestException($"{ErrorMessages.NullProperties} User information");
            }
            
            mapper.Map<Degree>(await GetById(userDegree.DegreeId) ??
                throw new NotFoundException($"{ErrorMessages.EntityNotFound} Degree"));

            mapper.Map<User>(await userHelperService.GetUser(userDegree.UserId) ??
                throw new NotFoundException($"{ErrorMessages.EntityNotFound} User"));

            mapper.Map<Institution>(await institutionHelperService
                .GetInstitutionById(userDegree.InstitutionId) ??
                throw new NotFoundException($"{ErrorMessages.EntityNotFound} Institution"));
        }
    }
}