using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Wisdoeducative.Application.Common.Exceptions;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Wisdoeducative.Application.Services
{
    public class CourseService : ICourseService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IEntityHistoryService<Course> courseHistoryService;
        private readonly ICourseHelperService courseHelperService;

        public CourseService(IApplicationDBContext dBContext,
            IMapper mapper,
            IEntityHistoryService<Course> courseHistoryService,
            ICourseHelperService courseHelperService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.courseHistoryService = courseHistoryService;
            this.courseHelperService = courseHelperService;
        }

        public async Task<List<CourseDto>> CreateCourse(List<CourseDto> courses)
        {
            
            if(dBContext.Database.CurrentTransaction == null)
            {
                using var transaction = dBContext.Database.BeginTransaction();
                try
                {
                    transaction.Commit();
                    return await CreateCoursesLogic(courses);
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }
            else
            {
                return await CreateCoursesLogic(courses);
            }
        }

        public async Task<List<CourseDto>> CreateCoursesLogic(List<CourseDto> courses)
        {
            List<CourseDto> finalCourses = new List<CourseDto>();
            foreach (CourseDto course in courses)
            {

                if (!courseHelperService.ValidateCourseBeforeCreation(course))
                {
                    throw new BadRequestException($"{ErrorMessages.NullProperties} Course");
                }

                Course entityCourse = courseHelperService.CreateNewCourseFromDto(course);
                await AddCourseAndSaveWithHistory(entityCourse);
                finalCourses.Add(mapper.Map<CourseDto>(entityCourse));
            }

            return finalCourses;
        }

        public async Task AddCourseAndSaveWithHistory(Course course)
        {
            dBContext.Courses.Add(course);
            await dBContext.SaveChangesAsync();
            await SaveCourseHistory(course);
            await dBContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<CourseDto>> GetStudyTermCourses(int studyTermId)
        {
            if (studyTermId == 0)
                throw new BadRequestException("You must provide a study plan term to get its courses");

            return await dBContext.Courses
                .Where(c => c.StudyPlanTermId == studyTermId && c.status == Domain.Enums.EntityStatus.Active)
                .Select(c => mapper.Map<CourseDto>(c))
                .ToListAsync();
        }

        public async Task SaveCourseHistory(Course course)
        {
            User user = await GetUserFromCourse(course);
            
            await courseHistoryService.SaveChanges(course, course.Id, Domain.Enums.EntityChangeTypes.Modified,
                user.B2cId);
        }

        public async Task<User> GetUserFromCourse(Course course)
        {
            return await dBContext.Courses
                .Where(c => c.Id == course.Id)
                .Select(c => c.StudyPlanTerm!.StudyPlan!.UserDegree.User)
                .FirstOrDefaultAsync() ?? throw new BadRequestException("User ID not found for the given course.");
        }

        public async Task<IEnumerable<CourseDto>> SearchCourses(int studyPlanId,
            SearchCourseDto searchCourseModel)
        {
            List<CourseStatus> courseStatuses =
                courseHelperService.ConvertStringCourseStatusToEnum(searchCourseModel.Statuses);

            var query = dBContext.Courses
                .Where(c => c.StudyPlanTerm.StudyPlan!.Id == studyPlanId);

            if (courseStatuses.Count > 0)
            {
                query = query.Where(c => courseStatuses.Contains(c.CourseStatus));
            }

            if (!string.IsNullOrEmpty(searchCourseModel.Name))
            {
                query = query.Where(c => c.Name.Contains(searchCourseModel.Name));
            }

            if (searchCourseModel.IsFavorite)
            {
                query = query.Where(c => c.IsFavorite == true);
            }

            var results = await query.ToListAsync();
            return mapper.Map<List<CourseDto>>(results);
        }
    }
}