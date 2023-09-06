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
    public class StudyPlanService : IStudyPlanService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IStudyPlanHelperService studyPlanHelperService;
        private readonly IEntityHistoryService<StudyPlan> studyPlanHistoryService;

        public StudyPlanService(IApplicationDBContext dBContext,
            IMapper mapper,
            IStudyPlanHelperService studyPlanHelperService,
            IEntityHistoryService<StudyPlan> studyPlanHistoryService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.studyPlanHelperService = studyPlanHelperService;
            this.studyPlanHistoryService = studyPlanHistoryService;
        }

        public async Task<StudyPlanDTO> CreateStudyPlan(StudyPlanDTO studyPlan)
        {

            using var transaction = dBContext.Database.BeginTransaction();
            try
            {
                if (!studyPlanHelperService.ValidateStudyPlanBeforeCreate(studyPlan))
                {
                    throw new BadRequestException($"{ErrorMessages.NullProperties}");
                }

                StudyPlan studyPlanEntity = studyPlanHelperService.CreateNewStudyPlanFromDto(studyPlan);
                await AddStudyPlanAndSaveWithHistory(studyPlanEntity);

                transaction.Commit();

                return mapper.Map<StudyPlanDTO>(studyPlanEntity);
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
        }

        private async Task AddStudyPlanAndSaveWithHistory(StudyPlan studyPlanEntity)
        {
            dBContext.StudyPlans.Add(studyPlanEntity);
            await dBContext.SaveChangesAsync();
            await SaveStudyPlanHistory(studyPlanEntity, Domain.Enums.EntityChangeTypes.Added);
            await dBContext.SaveChangesAsync();
        }

        public async Task<StudyPlanDTO> GetUserStudyPlan(int userDegreeId)
        {
            var studyPlan = await dBContext.StudyPlans
                .Where(s => s.UserDegreeId == userDegreeId)
                .FirstOrDefaultAsync()
            ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound}");

            return mapper.Map<StudyPlanDTO>(studyPlan);
        } 

        private async Task SaveStudyPlanHistory(StudyPlan studyPlan,
            Domain.Enums.EntityChangeTypes type)
        {
            var user = await GetUserFromStudyPlan(studyPlan);
            await studyPlanHistoryService.SaveChanges(studyPlan, studyPlan.Id,
                type, user.B2cId);
        }

        private async Task<User> GetUserFromStudyPlan(StudyPlan studyPlan)
        {
            var user = await dBContext.StudyPlans
                .Where(s => s.Id == studyPlan.Id)
                .Select(s => s.UserDegree.User)
                .FirstOrDefaultAsync();

            return user == null 
                ? throw new InternalServerErrorException($"{ErrorMessages.EntityNotFound}") 
                : user;
        }

        public async Task<StudyPlanDTO> GetStudyPlanById(int studyPlanId)
        {
            var result = await dBContext.StudyPlans
                .Where(s => s.Id == studyPlanId)
                .Where(s => s.Status == Domain.Enums.EntityStatus.Active)
                .FirstOrDefaultAsync() ??
                throw new NotFoundException($"{ErrorMessages.EntityNotFound}");
            return mapper.Map<StudyPlanDTO>(result);
        }
    }
}