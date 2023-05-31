using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface IInterestService
    {
        Task CheckInterestList(IEnumerable<InterestDto> interests);
        Task<InterestDto> CreateInterest(InterestDto interestDto);
        Task<IEnumerable<InterestDto>> SetInterestToUser(IEnumerable<InterestDto> interests, 
            UserDto user);
        Task<IEnumerable<InterestDto>> GetUserInterests(int userId);
    }
}