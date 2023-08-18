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
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Services
{
    public class CourseService : ICourseService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IEntityHelperService entityHelperService;
        private readonly IEntityHistoryService<Course> courseHistoryService;

        public CourseService(IApplicationDBContext dBContext,
            IMapper mapper,
            IEntityHelperService entityHelperService,
            IEntityHistoryService<Course> courseHistoryService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.entityHelperService = entityHelperService;
            this.courseHistoryService = courseHistoryService;
        }

        public async Task<CourseDto> CreateCourse(CourseDto course)
        {
            string[] propertiesToCheck = new string[] { "StudyPlanTermId", "Name", "TotalCredits" };
            if (!entityHelperService.AreAnyPropertiesNull(course, propertiesToCheck))
            {
                throw new BadRequestException($"{ErrorMessages.NullProperties} Course");
            }
            Course entityCourse = mapper.Map<Course>(course);
            entityCourse.CourseStatus = Domain.Enums.CourseStatus.InProgress;
            entityCourse.status = Domain.Enums.EntityStatus.Active;
            dBContext.Courses.Add(entityCourse);
            await dBContext.SaveChangesAsync();
            await SaveCourseHistory(entityCourse);
            await dBContext.SaveChangesAsync();
            return mapper.Map<CourseDto>(entityCourse);
        }

        public async Task<IEnumerable<CourseDto>> GetStudyTermCourses(int studyTermId)
        {
            if (studyTermId == 0)
                throw new BadRequestException("You must provide a study plan term to get it's courses");
            List<CourseDto> courseDtos = new List<CourseDto>();
            IEnumerable<Course> entityCourses = await dBContext.Courses
                .Where(c => c.StudyPlanTermId == studyTermId)
                .Where(c => c.status == Domain.Enums.EntityStatus.Active)
                .ToListAsync();

            foreach(Course entityCourse in entityCourses)
            {
                courseDtos.Add(mapper.Map<CourseDto>(entityCourse));
            }
            return courseDtos;
        }

        public async Task SaveCourseHistory(Course course)
        {
            var user = await dBContext.Courses
                .Where(c => c.Id == course.Id)
                .Select(c => c.StudyPlanTerm.StudyPlan.UserDegree.User)
                .FirstOrDefaultAsync() ?? throw new BadRequestException("User ID not found for the given course.");
            
            await courseHistoryService.SaveChanges(course, course.Id, Domain.Enums.EntityChangeTypes.Modified,
                user.B2cId);
            
        }
    }
}