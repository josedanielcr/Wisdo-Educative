﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Exceptions;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Helpers
{
    public class CourseHelperService : ICourseHelperService
    {
        private readonly IEntityHelperService entityHelperService;
        private readonly IMapper mapper;

        public CourseHelperService(IEntityHelperService entityHelperService,
            IMapper mapper)
        {
            this.entityHelperService = entityHelperService;
            this.mapper = mapper;
        }

        public Course CreateNewCourseFromDto(CourseDto courseDto)
        {
            Course course = mapper.Map<Course>(courseDto);
            course.CourseStatus = Domain.Enums.CourseStatus.InProgress;
            course.status = Domain.Enums.EntityStatus.Active;
            return course;
        }

        public bool ValidateCourseBeforeCreation(CourseDto courseDto)
        {
            string[] propertiesToCheck = new string[] { "StudyPlanTermId", "Name", "TotalCredits" };
            if (entityHelperService.AreAnyPropertiesNull(courseDto, propertiesToCheck))
            {
                return false;
            }
            return true;
        }
    }
}
