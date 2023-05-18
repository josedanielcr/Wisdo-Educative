using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface IRoleService
    {
        Task<RoleDto> GetRoleByName(UserRoles role);
    }
}
