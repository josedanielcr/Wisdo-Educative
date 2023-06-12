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
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Application.Helpers;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Services
{
    public class DegreeService : IDegreeService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IEntityHelperService entityHelperService;
        private readonly IDegreeHelperService degreeHelperService;
        private readonly IUserHelperService userHelperService;
        private readonly IEntityHistoryService<UserDegree> userDegreeHistory;
        private readonly IEntityHistoryService<User> userHistory;
        private readonly IUserService userService;

        public DegreeService(IApplicationDBContext dBContext,
            IMapper mapper,
            IEntityHelperService entityHelperService,
            IDegreeHelperService degreeHelperService,
            IUserHelperService userHelperService,
            IEntityHistoryService<UserDegree> userDegreeHistory,
            IEntityHistoryService<User> userHistory,
            IUserService userService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.entityHelperService = entityHelperService;
            this.degreeHelperService = degreeHelperService;
            this.userHelperService = userHelperService;
            this.userDegreeHistory = userDegreeHistory;
            this.userHistory = userHistory;
            this.userService = userService;
        }

        public async Task<DegreeDto> CreateDegree(DegreeDto degree)
        {
            string[] propertiesToCheck = new string[] { "Name", "StudyField", "Type" };
            if (entityHelperService.AreAnyPropertiesNull(degree, propertiesToCheck)) 
            { 
                throw new BadRequestException($"{ErrorMessages.NullProperties} Degree");
            }
            
            var dbDegree = mapper.Map<Degree>(degree);
            dbDegree.Status = EntityStatus.Active;

            dBContext.Degrees.Add(dbDegree);
            await dBContext.SaveChangesAsync();
            return await GetDegreeById(dbDegree.Id);   
        }

        public async Task<DegreeDto> GetDegreeById(int degreeId)
        {
            return await degreeHelperService.GetById(degreeId);
        }

        public async Task SaveUserDegreeChanges(UserDegree userDegree)
        {
            User user = mapper.Map<User>(await userHelperService.GetUser(userDegree.UserId) ??
                throw new NotFoundException($"{ErrorMessages.EntityNotFound} User"));
            
            user.UserStatus = UserStatus.Active;
            UserDto userDto = mapper.Map<UserDto>(user);
            await userService.UpdateUser(userDto);
            await userHistory.SaveChanges(user, user.Id, EntityChangeTypes.Modified, user.B2cId);
            await userDegreeHistory.SaveChanges(userDegree, userDegree.Id, EntityChangeTypes.Added, user.B2cId);
            await dBContext.SaveChangesAsync();
        }

        public async Task<UserDegreeDto> SetupUserDegree(UserDegreeConfigDTO userDegreeConfig)
        {
            await degreeHelperService.ValidateUserDegreeProperties(userDegreeConfig);

            UserDegree userDegree = new UserDegree
            {
                DegreeId = userDegreeConfig.DegreeId,
                UserId = userDegreeConfig.UserId,
                InstitutionId = userDegreeConfig.InstitutionId,
                CurrentProgress = 0,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddYears(4),
                Status = EntityStatus.Active,
                Schedule = Enum.Parse<AcademicSchedule>(userDegreeConfig.Schedule)
            };

            dBContext.UserDegrees.Add(userDegree);
            await dBContext.SaveChangesAsync();
            await SaveUserDegreeChanges(userDegree);
            return mapper.Map<UserDegreeDto>(userDegree);
        }
    }
}