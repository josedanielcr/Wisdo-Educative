using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        private readonly IEntityHistoryService<User> userHistoryService;
        private readonly IRoleService roleService;
        private readonly IInterestService interestService;
        private readonly ISubscriptionService subscriptionService;

        public UserService(IApplicationDBContext dBContext, 
            IMapper mapper, 
            IUserHelperService userServiceHelper,
            IEntityHistoryService<User> userHistoryService,
            IRoleService roleService,
            IInterestService interestService,
            ISubscriptionService subscriptionService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.userServiceHelper = userServiceHelper;
            this.userHistoryService = userHistoryService;
            this.roleService = roleService;
            this.interestService = interestService;
            this.subscriptionService = subscriptionService;
        }

        public async Task<UserDto> CreateUser(UserDto user)
        {
            bool isExistingUser = await userServiceHelper.DoesUserExist(user);
            if (isExistingUser)
            {
                throw new BadRequestException($"{ErrorMessages.UserAlreadyExistsErrorMessage}{user.Email}");
            }

            User userEntity = mapper.Map<User>(user);
            await AddDataToUser(userEntity);
            
            dBContext.Users.Add(userEntity);
            SaveToHistory(userEntity,EntityChangeTypes.Added, user.B2cId);
            await dBContext.SaveChangesAsync();

            return mapper.Map<UserDto>(userEntity);
        }
        
        private void SaveToHistory(User user, EntityChangeTypes type, string modifiedBy)
        {
            userHistoryService.SaveChanges(user, user.Id, type, modifiedBy);
        }

        private async Task AddDataToUser(User user)
        {
            user.UserStatus = UserStatus.Pending;
            var role = await roleService.GetRoleByName(UserRoles.Student) 
                ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound} {UserRoles.Student}");
            user.RoleId = role.Id;
        }

        public async Task<UserDto> SetUserData(UserDto user)
        {
            if (!userServiceHelper.AreUserPropertiesNotNull(user).Result)
            {
                throw new BadRequestException($"{ErrorMessages.NullProperties} User={user}");
            }

            await subscriptionService.LinkSubscriptionToAccount(SubscriptionNames.Free, user.Id,
                user.B2cId);
            SaveToHistory(mapper.Map<User>(user), EntityChangeTypes.Modified, user.B2cId);
            await UpdateUser(user);
            return await userServiceHelper.GetUser(user.Id);
        }

        public async Task<UserDto> SetUserInterests(int userId, IEnumerable<InterestDto> interests)
        {
            var user = await userServiceHelper.GetUserById(userId) 
                ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound} {userId}");

            await interestService.SetInterestToUser(interests, user);
            return mapper.Map<UserDto>(user);
        }

        public async Task UpdateUser(UserDto user)
        {
            var userEntity = mapper.Map<User>(user);
            dBContext.Users.Attach(userEntity);
            dBContext.Entry(userEntity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            dBContext.Entry(userEntity).Property(u => u.B2cId).IsModified = false;
            await dBContext.SaveChangesAsync();
        }
    }
}