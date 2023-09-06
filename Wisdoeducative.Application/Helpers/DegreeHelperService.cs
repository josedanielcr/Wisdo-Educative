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

        public DegreeHelperService(IApplicationDBContext dBContext,
            IMapper mapper,
            IEntityHelperService entityHelper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.entityHelper = entityHelper;
        }

        public bool AreDegreeDatesInvalid(UserDegreeConfigDTO degree)
        {
            DateTime currentDate = DateTime.Now;
            if(degree.startDate > currentDate)
            {
                return true;
            }
            return false;
        }

        public async Task<DegreeDto> GetById(int degreeId)
        {
            var dbDegree = await dBContext.Degrees
                .Where(x => x.Id == degreeId)
                .FirstOrDefaultAsync();

            return dbDegree == null
                ? throw new NotFoundException($"{ErrorMessages.EntityNotFound}")
                : mapper.Map<DegreeDto>(dbDegree);
        }

        public bool IsDegreeInvalid(DegreeDto degree)
        {
            string[] propertiesToCheck = new string[] { "Name", "StudyField", "Type" };
            if (entityHelper.AreAnyPropertiesNull(degree, propertiesToCheck))
            {
                return true;
            }
            return false;
        }

        public DegreeDto ParseUserDegreeDtoToDegree(UserDegreeConfigDTO userDegree)
        {
            if (entityHelper.AreAnyPropertiesNull(userDegree))
            {
                throw new BadRequestException($"{ErrorMessages.NullProperties}");
            }
            
            var newDegree = new DegreeDto();
            newDegree.Name = userDegree.DegreeName;
            newDegree.StudyField = userDegree.StudyField;
            newDegree.Type = userDegree.DegreeType;
            return newDegree;
        }
        
        public bool AreUserDegreePropertiesInvalid(UserDegreeConfigDTO userDegree)
        {
            if (entityHelper.AreAnyPropertiesNull(userDegree))
            {
                return true;
            }
            return false;
        }
    }
}