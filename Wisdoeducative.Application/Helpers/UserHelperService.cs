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
    public class UserHelperService : IUserHelperService
    {
        private readonly IApplicationDBContext DbContext;
        private readonly IMapper mapper;

        public UserHelperService(IApplicationDBContext DbContext, IMapper mapper)
        {
            this.DbContext = DbContext;
            this.mapper = mapper;
        }

        public async Task<UserDto> GetUser(int? id = null, string? email = null, string? name = null, 
            string? lastname = null, string? b2cId = null)
        {
            var user = await DbContext.Users.FirstOrDefaultAsync(u =>
                   (id == null || u.Id == id) &&
                   (email == null || u.Email == email) &&
                   (name == null || u.Name == name) &&
                   (lastname == null || u.LastName == lastname) &&
                   (b2cId == null || u.B2cId == b2cId)
               );

            return user != null ? mapper.Map<UserDto>(user) : null!;
        }

        public async Task<bool> DoesUserExist(UserDto user)
        {
            var userDB = await GetUser(user.Id,user.Email,user.Name,user.LastName,user.B2cId);

            return userDB != null;
        }

        public Task<bool> AreUserPropertiesNotNull(UserDto user)
        {
            if (user == null)
            {
                throw new BadRequestException($"{ErrorMessages.NullProperties} User={user}");
            }

            return Task.FromResult(
                !string.IsNullOrEmpty(user.Name) &&
                !string.IsNullOrEmpty(user.LastName) &&
                !(user.DateOfBirth == DateTime.MinValue) &&
                !string.IsNullOrEmpty(user.Category));
        }
    }
}