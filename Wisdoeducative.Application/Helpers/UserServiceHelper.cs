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
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Helpers
{
    public class UserServiceHelper : IUserServiceHelper
    {
        private readonly IApplicationDBContext DbContext;
        private readonly IMapper mapper;

        public UserServiceHelper(IApplicationDBContext DbContext, IMapper mapper)
        {
            this.DbContext = DbContext;
            this.mapper = mapper;
        }

        public async Task<UserDto> GetUser(int id, string email, string username, string b2cId)
        {
            var user = await DbContext.Users
                .Where(user => user.Id == id || 
                user.Email == email || 
                user.Username == username || 
                user.B2cId == b2cId)
                .FirstOrDefaultAsync();

            if (user != null)
            {
                return mapper.Map<UserDto>(user);
            }

            return null!;
        }

        public async Task<UserDto> GetUserByEmail(string email)
        {
            var user = await DbContext.Users
                .Where(user => user.Email == email)
                .FirstOrDefaultAsync();

            if (user != null)
            {
                return mapper.Map<UserDto>(user);
            }

            return null!;
        }

        public async Task<bool> DoesUserExist(UserDto user)
        {
            var userDB = await GetUser(user.Id,user.Email,user.Username,user.B2cId);

            return userDB != null;
        }

        public async Task<UserDto> GetUserByUsername(string username)
        {
            var user = await DbContext.Users
                .Where(user => user.Username == username)
                .FirstOrDefaultAsync();

            if (user != null)
            {
                return mapper.Map<UserDto>(user);
            }

            return null!;
        }

        public async Task<UserDto> GetUserByB2CId(string b2cId)
        {
            var user = await DbContext.Users
                .Where(user => user.B2cId == b2cId)
                .FirstOrDefaultAsync();

            if (user != null)
            {
                return mapper.Map<UserDto>(user);
            }

            return null!;
        }

        public async Task<UserDto> GetUserById(int id)
        {
            var user = await DbContext.Users
               .Where(user => user.Id == id)
               .FirstOrDefaultAsync();

            if (user != null)
            {
                return mapper.Map<UserDto>(user);
            }

            return null!;
        }
    }
}