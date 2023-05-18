using AutoMapper;
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
        private readonly IUserServiceHelper userServiceHelper;
        private readonly IEntityHistoryService<User> userHistoryService;
        private readonly IEntityHistoryService<Address> addressHistoryService;
        private readonly ILogger<UserService> logger;

        public UserService(IApplicationDBContext dBContext, 
            IMapper mapper, 
            IUserServiceHelper userServiceHelper,
            IEntityHistoryService<User> userHistoryService,
            IEntityHistoryService<Address> addressHistoryService,
            ILogger<UserService> logger)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.userServiceHelper = userServiceHelper;
            this.userHistoryService = userHistoryService;
            this.addressHistoryService = addressHistoryService;
            this.logger = logger;
        }

        public async Task<UserDto> CreateUser(UserDto user)
        {
            bool isExistingUser = await userServiceHelper.DoesUserExist(user);
            if (isExistingUser)
            {
                logger.LogWarning($"{ErrorMessages.UserAlreadyExistsErrorMessage}{user.Email}");
                throw new BadRequestException($"{ErrorMessages.UserAlreadyExistsErrorMessage}{user.Email}");
            }

            User userEntity = mapper.Map<User>(user);
            userEntity.UserStatus = UserStatus.Pending;
            userEntity.Address.Status = EntityStatus.Active;

            dBContext.Users.Add(userEntity);
            SaveToHistory(userEntity,EntityChangeTypes.Added, user.Username);
            await dBContext.SaveChangesAsync();

            return mapper.Map<UserDto>(userEntity);
        }

        private void SaveToHistory(User user, EntityChangeTypes type, string modifiedBy)
        {
            userHistoryService.SaveChanges(user, type, modifiedBy);
            addressHistoryService.SaveChanges(user.Address, type, modifiedBy);
        }
    }
}