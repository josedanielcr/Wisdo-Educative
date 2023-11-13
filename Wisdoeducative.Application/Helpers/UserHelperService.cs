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
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.Histories;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Helpers
{
    public class UserHelperService : IUserHelperService
    {
        private readonly IApplicationDBContext DbContext;
        private readonly IMapper mapper;
        private readonly IEntityHistoryService<User> userHistoryService;
        private readonly IEntityHelperService entityHelperService;

        public UserHelperService(IApplicationDBContext DbContext,
            IMapper mapper,
              IEntityHistoryService<User> userHistoryService,
              IEntityHelperService entityHelperService)
        {
            this.DbContext = DbContext;
            this.mapper = mapper;
            this.userHistoryService = userHistoryService;
            this.entityHelperService = entityHelperService;
        }

        public async Task<UserDto> GetUser(int? id = null, string? email = null, string? name = null, 
            string? lastname = null, string? b2cId = null)
        {
            var user = await DbContext.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u =>
                    (id == 0 || id == null || u.Id == id) &&
                    (email == null || u.Email == email) &&
                    (b2cId == null || u.B2cId == b2cId));


            return user != null ? mapper.Map<UserDto>(user) : null!;
        }

        public async Task<bool> DoesUserExist(UserDto user)
        {
            var userDB = await GetUser(user.Id,user.Email,user.Name,user.LastName,user.B2cId);

            return userDB != null;
        }
        
        public async Task SaveUserHistory(User user, EntityChangeTypes type, string modifiedBy)
        {
            await userHistoryService.SaveChanges(user, user.Id, type, modifiedBy);
        }
        public bool IsUserAgeInvalid(DateTime age)
        {
            DateTime validDate = DateTime.Now.AddYears(-13);
            if (age >= validDate)
            {
                return true;
            }
            return false;
        }
    
        public bool IsUserConfigurationInvalid(UserDto user)
        {
            string[] propertiesToCheck = new string[] { "Name", "LastName", "DateOfBirth", "Category" };
            if (entityHelperService.AreAnyPropertiesNull(user, propertiesToCheck))
            {
                return true;
            }
            return false;
        }

        public bool IsGeneralUserDataInvalid(UserDto user)
        {
            string[] propertiesToCheck = new string[] { "B2cId", "Email" };
            if (entityHelperService.AreAnyPropertiesNull(user, propertiesToCheck))
            {
                return true;
            }
            return false;
        }
    }
}