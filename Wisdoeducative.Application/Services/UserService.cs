using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Wisdoeducative.Application.Common.Exceptions;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IUserHelperService userServiceHelper;
        private readonly IRoleService roleService;
        private readonly IInterestService interestService;
        private readonly ISubscriptionService subscriptionService;
        private readonly IEntityHelperService entityHelperService;
        private readonly IDegreeService degreeService;

        public UserService(IApplicationDBContext dBContext, 
            IMapper mapper, 
            IUserHelperService userServiceHelper,
            IRoleService roleService,
            IInterestService interestService,
            ISubscriptionService subscriptionService,
            IEntityHelperService entityHelperService,
            IDegreeService degreeService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.userServiceHelper = userServiceHelper;
            this.roleService = roleService;
            this.interestService = interestService;
            this.subscriptionService = subscriptionService;
            this.entityHelperService = entityHelperService;
            this.degreeService = degreeService;
        }

        public async Task<UserDto> CreateUser(UserDto user)
        {
            User userEntity = mapper.Map<User>(user);
            var role = await roleService.GetRoleByName(UserRoles.Student)
                ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound} {UserRoles.Student}");
            userEntity.RoleId = role.Id;
            userEntity.UserStatus = UserStatus.Pending;
            dBContext.Users.Add(userEntity);
            await userServiceHelper.SaveUserHistory(userEntity, EntityChangeTypes.Added, user.B2cId);
            await dBContext.SaveChangesAsync();

            return mapper.Map<UserDto>(userEntity);
        }

        public async Task<UserDto> UserConfiguration(UserSetupDTO userSetupDTO)
        {
            using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            try
            {
                var userSetup = await SetUserData(userSetupDTO.User);
                var interestsSetup = await SetUserInterests(userSetupDTO.User.Id, userSetupDTO.InterestsDtos);
                var userDegreeSetup = await degreeService.SetupUserDegree(userSetupDTO.UserDegreConfig);

                //complete user
                User alreadyExistingUser = dBContext.Users.Find(userSetupDTO.User.Id)!;
                alreadyExistingUser.UserStatus = UserStatus.Active;

                //save changes
                await dBContext.SaveChangesAsync();

                //complete
                scope.Complete();
            }
            catch (Exception)
            {
                throw;
            }
            return mapper.Map<UserDto>(dBContext.Users.Find(userSetupDTO.User.Id));
        }

        public async Task<UserDto> SetUserData(UserDto user)
        {
            string[] propertiesToCheck = new string[] { "Name", "LastName", "DateOfBirth", "Category" };
            if (entityHelperService.AreAnyPropertiesNull(user, propertiesToCheck))
            {
                throw new BadRequestException($"{ErrorMessages.NullProperties} User={user}");
            }

            DateTime validDate = DateTime.Now.AddYears(-13);
            if (user.DateOfBirth >= validDate)
            {
                throw new BadRequestException($"You need to have more than 13 years old");
            }

            await subscriptionService.LinkSubscriptionToAccount(SubscriptionNames.Free, user.Id, user.B2cId);
            await UpdateUser(user);
            return await userServiceHelper.GetUser(user.Id);
        }

        public async Task<UserDto> SetUserInterests(int userId, IEnumerable<InterestDto> interests)
        {
            var user = await userServiceHelper.GetUser(userId)
                ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound} {userId}");
            await interestService.SetInterestToUser(interests, user);
            return mapper.Map<UserDto>(user);
        }

        public async Task UpdateUser(UserDto user)
        {
            var userEntity = mapper.Map<User>(user);
            dBContext.Users.Attach(userEntity);
            dBContext.Entry(userEntity).State = EntityState.Modified;
            dBContext.Entry(userEntity).Property(u => u.B2cId).IsModified = false;
            await userServiceHelper.SaveUserHistory(userEntity, EntityChangeTypes.Modified, user.B2cId);
        }

        public async Task<UserDto> ValidateUser(UserDto user)
        {
            string[] propertiesToCheck = new string[] { "B2cId", "Email" };
            if (entityHelperService.AreAnyPropertiesNull(user, propertiesToCheck))
            {
                throw new BadRequestException($"{ErrorMessages.NullProperties} User={user}");
            }

            bool isExistingUser = await userServiceHelper.DoesUserExist(user);

            if (!isExistingUser) await CreateUser(user);

            return await userServiceHelper.GetUser(null,user.Email,null,null,user.B2cId);
        }
    }
}