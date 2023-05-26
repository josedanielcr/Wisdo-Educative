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
        private readonly IUserHelperService userServiceHelper;
        private readonly IEntityHistoryService<User> userHistoryService;
        private readonly IEntityHistoryService<Address> addressHistoryService;
        private readonly IEntityHistoryService<Role> roleHistoryService;
        private readonly IRoleService roleService;

        public UserService(IApplicationDBContext dBContext, 
            IMapper mapper, 
            IUserHelperService userServiceHelper,
            IEntityHistoryService<User> userHistoryService,
            IEntityHistoryService<Address> addressHistoryService,
            IEntityHistoryService<Role> roleHistoryService,
            IRoleService roleService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.userServiceHelper = userServiceHelper;
            this.userHistoryService = userHistoryService;
            this.addressHistoryService = addressHistoryService;
            this.roleHistoryService = roleHistoryService;
            this.roleService = roleService;
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
            addressHistoryService.SaveChanges(user.Address, user.Address.Id, type, modifiedBy);
        }

        private async Task AddDataToUser(User user)
        {
            user.UserStatus = UserStatus.Pending;
            user.Address.Status = EntityStatus.Active;
            var role = await roleService.GetRoleByName(UserRoles.Student) 
                ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound} {UserRoles.Student}");
            user.RoleId = role.Id;
        }
    }
}