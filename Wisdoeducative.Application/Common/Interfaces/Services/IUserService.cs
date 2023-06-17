﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface IUserService
    {
        Task<UserDto> CreateUser(UserDto user);
        Task<UserDto> SetUserData(UserDto user);
        Task<UserDto> SetUserInterests(int userId, IEnumerable<InterestDto> interests);
        Task UpdateUser(UserDto user);
        Task<UserDto> ValidateUser(UserDto user);
    }
}