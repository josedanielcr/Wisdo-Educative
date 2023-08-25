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
        private readonly IEntityHelperService helperService;
        private readonly IEntityHistoryService<StudyPlan> studyPlanHistoryService;
        private readonly IEntityHistoryService<StudyPlanTerm> studyPlanTermHistoryService;
        private readonly ICourseService courseService;

        public StudyPlanService(IApplicationDBContext dBContext,
            IMapper mapper,
            IEntityHelperService helperService,
            IEntityHistoryService<StudyPlan> studyPlanHistoryService,
            IEntityHistoryService<StudyPlanTerm> studyPlanTermHistoryService,
            ICourseService courseService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.helperService = helperService;
            this.studyPlanHistoryService = studyPlanHistoryService;
            this.studyPlanTermHistoryService = studyPlanTermHistoryService;
            this.courseService = courseService;
        }

        public async Task<StudyPlanDTO> CreateStudyPlan(StudyPlanDTO studyPlan)
        {
            string[] propertiesToCheck = new string[] { "UserDegreeId" };
            if (helperService.AreAnyPropertiesNull(studyPlan, propertiesToCheck))
            {
                throw new BadRequestException($"{ErrorMessages.NullProperties} Study plan degree");
            }
            StudyPlan studyPlanEntity = mapper.Map<StudyPlan>(studyPlan);
            studyPlanEntity.Status = Domain.Enums.EntityStatus.Active;
            dBContext.StudyPlans.Add(studyPlanEntity);
            await dBContext.SaveChangesAsync();
            await SaveStudyPlanHistory(studyPlanEntity, Domain.Enums.EntityChangeTypes.Added);
            await dBContext.SaveChangesAsync();
            return mapper.Map<StudyPlanDTO>(studyPlanEntity);
        }

        public async Task<StudyTermCreationDto> CreateStudyPlanTerm(StudyTermCreationDto studyTermCreationDto)
        {
            ValidateStudyTermCreationDto(studyTermCreationDto);

            var newStudyPlan = CreateNewStudyPlanTerm(studyTermCreationDto);
            await SaveNewStudyPlanTerm(newStudyPlan);

            if (HasCourses(studyTermCreationDto))
            {
                AssignStudyPlanTermIdToCourses(studyTermCreationDto.coursesDtos, newStudyPlan.Id);
                studyTermCreationDto.coursesDtos = await CreateCourses(studyTermCreationDto.coursesDtos.ToList());
            }

            studyTermCreationDto.StudyPlanTermDto = mapper.Map<StudyPlanTermDto>(newStudyPlan);

            return studyTermCreationDto;
        }

        private void ValidateStudyTermCreationDto(StudyTermCreationDto studyTermCreationDto)
        {
            string[] propertiesToCheck = { "StudyPlanId", "StartDate", "EndDate" };
            if (helperService.AreAnyPropertiesNull(studyTermCreationDto.StudyPlanTermDto, propertiesToCheck))
            {
                throw new BadRequestException($"{ErrorMessages.NullProperties} Study plan term, needs to have a study plan associated");
            }
        }

        private StudyPlanTerm CreateNewStudyPlanTerm(StudyTermCreationDto studyTermCreationDto)
        {
            var studyPlanTerms = GetUserStudyPlanTerms(studyTermCreationDto.StudyPlanTermDto.StudyPlanId).Result;
            var newPeriodCount = studyPlanTerms.Count() + 1;
            studyTermCreationDto.StudyPlanTermDto.PeriodNumber = newPeriodCount;

            var newStudyPlan = mapper.Map<StudyPlanTerm>(studyTermCreationDto.StudyPlanTermDto);
            newStudyPlan.Status = Domain.Enums.EntityStatus.Active;
            newStudyPlan.StudyTermStatus = Domain.Enums.StudyTermStatus.InProgress;

            return newStudyPlan;
        }

        private async Task SaveNewStudyPlanTerm(StudyPlanTerm newStudyPlan)
        {
            dBContext.StudyPlanTerms.Add(newStudyPlan);
            await dBContext.SaveChangesAsync();
            await SaveStudyPlanTermHistory(newStudyPlan, Domain.Enums.EntityChangeTypes.Added);
            await dBContext.SaveChangesAsync();
        }

        private bool HasCourses(StudyTermCreationDto studyTermCreationDto)
        {
            return studyTermCreationDto.coursesDtos != null;
        }

        private void AssignStudyPlanTermIdToCourses(IEnumerable<CourseDto> courses, int studyPlanTermId)
        {
            foreach (var course in courses)
            {
                course.StudyPlanTermId = studyPlanTermId;
            }
        }

        private async Task<List<CourseDto>> CreateCourses(List<CourseDto> courses)
        {
            return await courseService.CreateCourse(courses);
        }


        public async Task<StudyPlanDTO> GetUserStudyPlan(int userDegreeId)
        {
            var studyPlan = await dBContext.StudyPlans
                .Where(s => s.UserDegreeId == userDegreeId)
                .FirstOrDefaultAsync()
            ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound} Study plan");

            return mapper.Map<StudyPlanDTO>(studyPlan);
        }

        public async Task<IEnumerable<StudyPlanTermDto>> GetUserStudyPlanTerms(int studyPlanId)
        {
            if (studyPlanId == 0)
                throw new BadRequestException($"You must provide a study plan to retrive all it's terms");
            List<StudyPlanTerm> studyPlanTerms = await dBContext.StudyPlanTerms
                .Where(s => s.StudyPlanId == studyPlanId)
                .ToListAsync();
            List<StudyPlanTermDto> studyPlanDTOs = new List<StudyPlanTermDto>();
            foreach (StudyPlanTerm studyPlanTerm in studyPlanTerms)
            {
                studyPlanDTOs.Add(mapper.Map<StudyPlanTermDto>(studyPlanTerm));
            }
            return studyPlanDTOs;
        }

        private async Task SaveStudyPlanHistory(StudyPlan studyPlan,
            Domain.Enums.EntityChangeTypes type)
        {
            var user = await dBContext.StudyPlans
                .Where(s => s.Id == studyPlan.Id)
                .Select(s => s.UserDegree.User)
                .FirstOrDefaultAsync()
                ?? throw new InternalServerErrorException($"{ErrorMessages.EntityNotFound} User");
            await studyPlanHistoryService.SaveChanges(studyPlan, studyPlan.Id,
                type, user.B2cId);
        }

        private async Task SaveStudyPlanTermHistory(StudyPlanTerm studyPlanTerm,
            Domain.Enums.EntityChangeTypes type)
        {
            var user = await dBContext.StudyPlanTerms
                .Where(s => s.Id == studyPlanTerm.Id)
                .Select(s => s.StudyPlan.UserDegree.User)
                .FirstOrDefaultAsync()
                ?? throw new InternalServerErrorException($"{ErrorMessages.EntityNotFound} User");
            await studyPlanTermHistoryService.SaveChanges(studyPlanTerm, studyPlanTerm.Id,
                type, user.B2cId);
        }
    }
}