using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface IUserHelperService
    {
        Task<UserDto> GetUser(int id, string email, string username, string b2cId);
        Task<UserDto> GetUserById(int id);
        Task<UserDto> GetUserByEmail(string email);
        Task<UserDto> GetUserByUsername(string username);
        Task<UserDto> GetUserByB2CId(string b2cId);
        Task<bool> DoesUserExist(UserDto user);
    }
}