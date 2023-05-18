using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Exceptions;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Services
{
    public class RoleService : IRoleService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;

        public RoleService(IApplicationDBContext dBContext, IMapper mapper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
        }

        public async Task<RoleDto> GetRoleByName(UserRoles role)
        {
            
            var roleDb = await dBContext.Roles
                .Where(r => r.Name == role)
                .FirstOrDefaultAsync();

            if(roleDb == null)
            {
                return null;
            }

            return mapper.Map<RoleDto>(roleDb);
        }
    }
}