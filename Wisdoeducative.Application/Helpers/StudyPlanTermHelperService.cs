using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Exceptions;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Helpers
{
    public class StudyPlanTermHelperService : IStudyPlanTermHelperService
    {
        private readonly IEntityHelperService helperService;
        private readonly IMapper mapper;
        private readonly ICourseService courseService;

        public StudyPlanTermHelperService(IEntityHelperService helperService,
            IMapper mapper,
            ICourseService courseService)
        {
            this.helperService = helperService;
            this.mapper = mapper;
            this.courseService = courseService;
        }

        public StudyPlanTerm CreateNewStudyPlanTerm(StudyTermCreationDto studyTermCreationDto,
            IEnumerable<StudyPlanTermDto> studyPlanTermDtos)
        {
            var newPeriodCount = studyPlanTermDtos.Count() + 1;
            studyTermCreationDto.StudyPlanTermDto.PeriodNumber = newPeriodCount;

            var newStudyPlan = mapper.Map<StudyPlanTerm>(studyTermCreationDto.StudyPlanTermDto);
            newStudyPlan.Status = Domain.Enums.EntityStatus.Active;
            newStudyPlan.StudyTermStatus = Domain.Enums.StudyTermStatus.InProgress;

            return newStudyPlan;
        }

        public bool ValidateStudyTermCreationDto(StudyTermCreationDto studyTermCreationDto)
        {
            string[] propertiesToCheck = { "StudyPlanId", "StartDate", "EndDate" };
            if (helperService.AreAnyPropertiesNull(studyTermCreationDto.StudyPlanTermDto, propertiesToCheck))
            {
                return false;
            }
            return true;
        }
        
        public bool HasCourses(StudyTermCreationDto studyTermCreationDto)
        {
            return studyTermCreationDto.coursesDtos != null;
        }

        public void AssignStudyPlanTermIdToCourses(IEnumerable<CourseDto> courses, int studyPlanTermId)
        {
            foreach (var course in courses)
            {
                course.StudyPlanTermId = studyPlanTermId;
            }
        }

        public async Task<List<CourseDto>> CreateCoursesForStudyPlanTerm(List<CourseDto> courses)
        {
            return await courseService.CreateCourse(courses);
        }
    }
}
