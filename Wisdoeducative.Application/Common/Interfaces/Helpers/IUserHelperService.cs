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
        Task<UserDto> GetUser(int? id = null, string? email = null, 
            string? name = null,string? lastname = null, string? b2cId = null);
        Task<UserDto> GetUserById(int id);
        Task<UserDto> GetUserByEmail(string email);
        Task<UserDto> GetUserByB2CId(string b2cId);
        Task<bool> DoesUserExist(UserDto user);
        Task<bool> AreUserPropertiesNotNull(UserDto user);
    }
}