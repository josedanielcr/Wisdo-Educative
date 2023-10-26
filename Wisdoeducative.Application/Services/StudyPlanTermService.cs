using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Exceptions;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Services
{
    public class StudyPlanTermService : IStudyPlanTermService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IEntityHistoryService<StudyPlanTerm> studyPlanTermHistoryService;
        private readonly IStudyPlanTermHelperService studyPlanTermHelperService;

        public StudyPlanTermService(IApplicationDBContext dBContext,
            IMapper mapper,
            IEntityHistoryService<StudyPlanTerm> studyPlanTermHistoryService,
            IStudyPlanTermHelperService studyPlanTermHelperService)
        {
            this.dBContext = dBContext;
            this.studyPlanTermHistoryService = studyPlanTermHistoryService;
            this.studyPlanTermHelperService = studyPlanTermHelperService;
            this.mapper = mapper;
        }
        
        public async Task<StudyTermCreationDto> CreateStudyPlanTerm(StudyTermCreationDto studyTermCreationDto)
        {
            using var transaction = dBContext.Database.BeginTransaction();
            try
            {
                await studyPlanTermHelperService.ValidateStudyTermCreationDto(studyTermCreationDto);

                var newStudyPlan = studyPlanTermHelperService.CreateNewStudyPlanTerm(studyTermCreationDto,
                    await GetUserStudyPlanTerms(studyTermCreationDto.StudyPlanTermDto.StudyPlanId));

                await AddAndSaveStudyPlanTerm(newStudyPlan);

                if (studyPlanTermHelperService.HasCourses(studyTermCreationDto))
                {
                    studyPlanTermHelperService.AssignStudyPlanTermIdToCourses(studyTermCreationDto.coursesDtos, newStudyPlan);
                    studyTermCreationDto.coursesDtos =
                        await studyPlanTermHelperService.CreateCoursesForStudyPlanTerm(studyTermCreationDto.coursesDtos.ToList());
                }

                studyTermCreationDto.StudyPlanTermDto = mapper.Map<StudyPlanTermDto>(newStudyPlan);

                transaction.Commit();

                return studyTermCreationDto;
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
        }

        private async Task AddAndSaveStudyPlanTerm(StudyPlanTerm newStudyPlan)
        {
            dBContext.StudyPlanTerms.Add(newStudyPlan);
            await dBContext.SaveChangesAsync();
            await SaveStudyPlanTermHistory(newStudyPlan, Domain.Enums.EntityChangeTypes.Added);
            await dBContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<StudyPlanTermDto>> GetUserStudyPlanTerms(int? studyPlanId)
        {
            List<StudyPlanTermDto> studyPlanTermsResult = new List<StudyPlanTermDto>();
            if (studyPlanId == 0)
                throw new BadRequestException($"{ErrorMessages.NoStudyPlanProvided}", "NoStudyPlanProvided");

            var studyPlanTerms = await dBContext.StudyPlanTerms
                    .Where(s => s.StudyPlanId == studyPlanId)
                    .ToListAsync();

            var studyPlanTermsDto = studyPlanTerms.Select(studyPlanTerm =>
                mapper.Map<StudyPlanTermDto>(studyPlanTerm));

            foreach(var studyPlanTerm in studyPlanTermsDto)
            {
                studyPlanTermsResult
                    .Add(await studyPlanTermHelperService.AddCalculatedFieldsToTerm(studyPlanTerm));
            }
            return studyPlanTermsResult;
        }

        private async Task SaveStudyPlanTermHistory(StudyPlanTerm studyPlanTerm,
            Domain.Enums.EntityChangeTypes type)
        {
            var user = await GetUserFromStudyPlanTerm(studyPlanTerm);
            await studyPlanTermHistoryService.SaveChanges(studyPlanTerm, studyPlanTerm.Id,
                type, user.B2cId);
        }
        
        private async Task<User> GetUserFromStudyPlanTerm(StudyPlanTerm studyPlanTerm)
        {
            var user = await dBContext.StudyPlanTerms
                .Where(s => s.Id == studyPlanTerm.Id)
                .Select(s => s.StudyPlan!.UserDegree.User)
                .FirstOrDefaultAsync();
            if(user != null)
            {
                return user;
            }
            throw new NotFoundException($"{ErrorMessages.EntityNotFound}", "EntityNotFound");
        }
    }
}