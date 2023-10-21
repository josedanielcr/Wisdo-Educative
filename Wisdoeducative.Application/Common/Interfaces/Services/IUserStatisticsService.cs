using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs.CustomDTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface IUserStatisticsService
    {
        Task<UserStatisticsDto> GetUserStatisticsAsync(int userId);
    }
}
