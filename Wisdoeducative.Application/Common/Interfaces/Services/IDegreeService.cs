using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface IDegreeService
    {
        Task<DegreeDto> CreateDegree(DegreeDto degree);
        Task<UserDegreeDto> SetupUserDegree(UserDegreeConfigDTO userDegreeConfig);
        Task SaveUserDegreeChanges(UserDegree userDegree);
        Task<UserDegreeDto> GetUserDegree(int userId);
    }
}