using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Exceptions;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Services
{
    public class UserStatisticsService : IUserStatisticsService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IDegreeService degreeService;
        private readonly IStudyPlanService studyPlanService;
        private readonly IStudyPlanTermService studyPlanTermService;
        private readonly ICourseService courseService;

        public UserStatisticsService(IApplicationDBContext dBContext,
            IMapper mapper,
            IDegreeService degreeService,
            IStudyPlanService studyPlanService,
            IStudyPlanTermService studyPlanTermService,
            ICourseService courseService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.degreeService = degreeService;
            this.studyPlanService = studyPlanService;
            this.studyPlanTermService = studyPlanTermService;
            this.courseService = courseService;
        }
        public async Task<UserStatisticsDto> GetUserStatisticsAsync(int userId)
        {
            UserStatisticsDto userStatisticsDto = new UserStatisticsDto();

            UserDegreeDto userDegree = 
                await degreeService.GetUserDegree(userId) 
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");

            StudyPlanDTO studyPlanDTO = 
                await studyPlanService.GetUserStudyPlanByUserDegreeId(userDegree.Id)
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");

            IEnumerable<StudyPlanTermDto> studyPlanTerms = 
                await studyPlanTermService.GetUserStudyPlanTerms(studyPlanDTO.Id);

            List<CourseDto> courses = await GetTotalCourses(studyPlanTerms
                .Select(dto => mapper.Map<StudyPlanTerm>(dto)).ToList());

            userStatisticsDto.CurrentProgress = CalculateCurrentProgress(courses, courses.Count());
            userStatisticsDto.AverageGrade = CalculateAverageGrade(courses, courses.Count());
            userStatisticsDto.CompletedCourses = courses.Where(course => course.CourseStatus == CourseStatus.Finished.ToString()).Count();
            userStatisticsDto.InProgressCourses = courses.Where(course => course.CourseStatus == CourseStatus.InProgress.ToString()).Count();
            userStatisticsDto.NotStartedCourses = courses.Where(course => course.CourseStatus == CourseStatus.NotStarted.ToString()).Count();

            return userStatisticsDto;
        }

        private int CalculateCurrentProgress(List<CourseDto> courses, int totalCourses)
        {
            List<CourseDto> completed = courses.
                Where(course => course.CourseStatus == CourseStatus.Finished.ToString())
                .ToList();

            return completed.Count() * 100 / totalCourses;
        }

        private int CalculateAverageGrade(List<CourseDto> courses, int totalCourses)
        {
            int totalGrade = 0;
            List<CourseDto> completed = courses.
                Where(course => course.CourseStatus == CourseStatus.Finished.ToString())
                .ToList();

            foreach (CourseDto course in completed)
            {
                totalGrade += int.Parse(course.CurrentScore!);
            }
            return totalGrade / totalCourses;
        }

        private async Task<List<CourseDto>> GetTotalCourses(List<StudyPlanTerm> studyPlanTerms)
        {
            List<CourseDto> courses = new List<CourseDto>();
            foreach(StudyPlanTerm studyPlanTerm in studyPlanTerms)
            {
                courses.AddRange(await courseService.GetStudyTermCourses(studyPlanTerm.Id));
            }
            return courses;
        }
    }
}
