using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface IUserHelperService
    {
        Task<UserDto> GetUser(int? id = null, string? email = null, 
            string? name = null,string? lastname = null, string? b2cId = null);
        Task<bool> DoesUserExist(UserDto user);
        Task SaveUserHistory(User user, EntityChangeTypes type, string modifiedBy);
    }
}