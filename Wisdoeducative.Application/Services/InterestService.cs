using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

namespace Wisdoeducative.Application.Services
{
    public class InterestService : IInterestService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;

        public InterestService(IApplicationDBContext dBContext, IMapper mapper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
        }

        private Task<bool> AreInterestPropertiesNotNull(InterestDto interest)
        {
            return Task.FromResult(!string.IsNullOrEmpty(interest.Name));
        }

        public async Task<InterestDto> CreateInterest(InterestDto interestDto)
        {
            if(interestDto == null || interestDto.Name == "")
            {
                throw new BadRequestException($"{ErrorMessages.NullProperties} Interest={interestDto}");
            }

            dBContext.Interests.Add(mapper.Map<Interest>(interestDto));
            await dBContext.SaveChangesAsync();
            return interestDto;
        }

        public async Task<IEnumerable<InterestDto>> SetInterestToUser(IEnumerable<InterestDto> interests,
            UserDto user)
        {
            await CheckInterestList(interests);

            foreach (var interest in interests) {
                var userInterest = new UserInterest
                {
                    InterestId = interest.Id,
                    UserId = user.Id,
                    Status = Domain.Enums.EntityStatus.Active
                };
                dBContext.UserInterests.Add(userInterest);
            }
            await dBContext.SaveChangesAsync();

            return await GetUserInterests(user.Id);
        }

        public Task CheckInterestList(IEnumerable<InterestDto> interests)
        {
            if (!interests.Any() || interests == null)
            {
                throw new BadRequestException($"{ErrorMessages.EmptyEntityList} Interests={interests}");
            }

            foreach (var interest in interests)
            {
                if (!AreInterestPropertiesNotNull(interest).Result)
                {
                    throw new BadRequestException($"{ErrorMessages.NullProperties} Interest={interest}");
                }
            }
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<InterestDto>> GetUserInterests(int userId)
        {
            List<Interest?> interests = await dBContext.UserInterests
                .Where(ui => ui.UserId == userId)
                .Select(ui => ui.Interest)
                .ToListAsync();

            await CheckInterestList(mapper.Map<IEnumerable<InterestDto>>(interests));

            return mapper.Map<IEnumerable<InterestDto>>(interests);
        }
    }
}