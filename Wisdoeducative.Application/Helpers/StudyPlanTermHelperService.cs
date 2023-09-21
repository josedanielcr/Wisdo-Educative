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
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Helpers
{
    public class StudyPlanTermHelperService : IStudyPlanTermHelperService
    {
        private readonly IEntityHelperService helperService;
        private readonly IMapper mapper;
        private readonly ICourseService courseService;
        private readonly IApplicationDBContext dBContext;
        private readonly IDegreeService degreeService;
        private readonly IStudyPlanService studyPlanService;

        public StudyPlanTermHelperService(IEntityHelperService helperService,
            IMapper mapper,
            ICourseService courseService,
            IApplicationDBContext dBContext,
            IDegreeService degreeService,
            IStudyPlanService studyPlanService)
        {
            this.helperService = helperService;
            this.mapper = mapper;
            this.courseService = courseService;
            this.dBContext = dBContext;
            this.degreeService = degreeService;
            this.studyPlanService = studyPlanService;
        }

        public StudyPlanTerm CreateNewStudyPlanTerm(StudyTermCreationDto studyTermCreationDto,
            IEnumerable<StudyPlanTermDto> studyPlanTermDtos)
        {
            var newPeriodCount = studyPlanTermDtos.Count() + 1;
            studyTermCreationDto.StudyPlanTermDto.PeriodNumber = newPeriodCount;

            var newStudyPlan = mapper.Map<StudyPlanTerm>(studyTermCreationDto.StudyPlanTermDto);
            newStudyPlan.Status = EntityStatus.Active;
            newStudyPlan.StudyTermStatus = 
                (StudyTermStatus)Enum.Parse(typeof(StudyTermStatus), 
                studyTermCreationDto.StudyPlanTermDto.StudyTermStatus!);

            return newStudyPlan;
        }

        public async Task ValidateStudyTermCreationDto(StudyTermCreationDto studyTermCreationDto)
        {
            string[] propertiesToCheck = { "StudyPlanId", "StartDate", "EndDate" };
            if (helperService.AreAnyPropertiesNull(studyTermCreationDto.StudyPlanTermDto, propertiesToCheck))
            {
                throw new BadRequestException($"{ErrorMessages.NullProperties}", "NullProperties");
            }
            await ValidateStudyPlanTermDates(studyTermCreationDto.StudyPlanTermDto);
        }

        private async Task ValidateStudyPlanTermDates(StudyPlanTermDto studyPlanTermDto)
        {

            var studyPlan = await studyPlanService.GetUserStudyPlan(studyPlanTermDto.StudyPlanId)
                ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound}", "EntityNotFound");

            var degree = await degreeService.GetUserDegreeById(studyPlan.UserDegreeId)
                ?? throw new NotFoundException($"{ErrorMessages.EntityNotFound}", "EntityNotFound");

            var studyPlanTerms = await dBContext.StudyPlanTerms
                .Where(spt => spt.StudyPlanId == studyPlanTermDto.StudyPlanId)
                .ToListAsync();

            await ValidateTermStartAfterDegree(studyPlanTermDto, degree);
            await MatchTermToUserDegreeSchedule(studyPlanTermDto, degree);

            if (studyPlanTerms!.Count != 0)
            {
                await CheckStudyTermOverlaping(studyPlanTerms, studyPlanTermDto);
            }
        }

        private Task<bool> ValidateTermStartAfterDegree(StudyPlanTermDto studyPlanTermDto, UserDegreeDto degree)
        {
            if(studyPlanTermDto.StartDate < degree.StartDate)
            {
                throw new BadRequestException($"{ErrorMessages.StudyPlanAfterCreationDate}", "StudyPlanAfterCreationDate");
            }
            return Task.FromResult(true);
        }

        private Task<bool> MatchTermToUserDegreeSchedule(StudyPlanTermDto studyPlanTermDto, 
            UserDegreeDto degree)
        {
            var userDegree = mapper.Map<UserDegree>(degree);
            int numberOfMonths = ((studyPlanTermDto.EndDate.Year - studyPlanTermDto.StartDate.Year) 
                * 12) +  (studyPlanTermDto.EndDate.Month - studyPlanTermDto.StartDate.Month) + 1;

            var scheduleToMonths = new Dictionary<Domain.Enums.AcademicSchedule, int>
            {
                { Domain.Enums.AcademicSchedule.Semester, 6 },
                { Domain.Enums.AcademicSchedule.Quarter, 4 },
                { Domain.Enums.AcademicSchedule.Trimester, 3 },
                { Domain.Enums.AcademicSchedule.Bimester, 2 }
            };

            if (scheduleToMonths.TryGetValue(userDegree.Schedule, out int expectedMonths))
            {
                if (numberOfMonths != expectedMonths)
                {
                    throw new BadRequestException($"{ErrorMessages.StudyPlanTermNotMatchWithSchedule}", "StudyPlanTermNotMatchWithSchedule");
                }
            }
            return Task.FromResult(true);
        }
        private Task<bool> CheckStudyTermOverlaping(List<StudyPlanTerm> studyPlanTerms, StudyPlanTermDto newStudyPlanTermDto)
        {
            foreach(StudyPlanTerm studyPlanTerm in studyPlanTerms)
            {
                if(newStudyPlanTermDto.StartDate >= studyPlanTerm.StartDate && 
                    newStudyPlanTermDto.EndDate <= studyPlanTerm.EndDate)
                {
                    throw new BadRequestException(ErrorMessages.StudyTermOverlap, "StudyTermOverlap");
                }
            }
            return Task.FromResult(true);
        }

        public bool HasCourses(StudyTermCreationDto studyTermCreationDto)
        {
            return studyTermCreationDto.coursesDtos != null;
        }

        public void AssignStudyPlanTermIdToCourses(IEnumerable<CourseDto> courses, StudyPlanTerm studyPlanTerm)
        {
            foreach (var course in courses)
            {
                course.StudyPlanTermId = studyPlanTerm.Id;
                if (studyPlanTerm.StudyTermStatus == StudyTermStatus.InProgress)
                {
                    course.CourseStatus = StudyTermStatus.InProgress.ToString();
                }
                else
                {
                    course.CourseStatus = StudyTermStatus.NotStarted.ToString();
                }
            }
        }

        public async Task<List<CourseDto>> CreateCoursesForStudyPlanTerm(List<CourseDto> courses)
        {
            return await courseService.CreateCourse(courses);
        }

        public async Task<StudyPlanTermDto> AddCalculatedFieldsToTerm(StudyPlanTermDto studyPlanTermDto)
        {
            var courses = await courseService.GetStudyTermCourses((int) studyPlanTermDto.Id!);
            if (courses == null)
            {
                studyPlanTermDto.CurrentProgress = 0;
                studyPlanTermDto.TotalCredits = 0;
            } else
            {
                studyPlanTermDto.TotalCredits = GetStudyTermTotalOfCredits(courses);
                studyPlanTermDto.CurrentProgress = GetStudyTermProgress(courses);
            }
            return studyPlanTermDto;
        }
        public int GetStudyTermTotalOfCredits(IEnumerable<CourseDto> courseDtos)
        {
            int totalCredits = 0;
            foreach (var item in courseDtos)
            {
                totalCredits += item.TotalCredits;
            }
            return totalCredits;
        }

        public int GetStudyTermProgress(IEnumerable<CourseDto> courseDtos)
        {
            int totalOfCourses = courseDtos.Count();
            int completedCourses = 0;
            foreach(var item in courseDtos)
            {
                if(item.CourseStatus == CourseStatus.Finished.ToString())
                {
                    completedCourses++;
                }
            }
            return completedCourses * 100 / totalOfCourses;
        }
    }
}