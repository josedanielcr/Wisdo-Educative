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
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Services
{
    public class CourseLinkService : ICourseLinkService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly ICourseLinkHelperService courseLinkHelper;

        public CourseLinkService(IApplicationDBContext dBContext,
            IMapper mapper,
            ICourseLinkHelperService courseLinkHelper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.courseLinkHelper = courseLinkHelper;
        }

        public async Task<CourseLinkDto> CreateCourseLink(CourseLinkDto courseLink)
        {
            if(!courseLinkHelper.ValidateCourseLink(courseLink))
            {
                throw new BadRequestException(ErrorMessages.NullProperties, "NullProperties");
            }
            
            dBContext.CourseLinks.Add(mapper.Map<CourseLink>(courseLink));
            await dBContext.SaveChangesAsync();
            return await CreateCourseLink(courseLink);
        }

        public async Task<CourseLinkDto> GetCourseLink(int courseId)
        {
            return await dBContext.CourseLinks
                .Where(cl => cl.CourseId == courseId)
                .Where(cl => cl.Status == Domain.Enums.EntityStatus.Active)
                .Select(cl => mapper.Map<CourseLinkDto>(cl))
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");
        }

        public async Task<CourseLinkDto> GetCourseLinkById(int CourseLinkId)
        {
            return await dBContext.CourseLinks
                .Where(cl => cl.Id == CourseLinkId)
                .Where(cl => cl.Status == Domain.Enums.EntityStatus.Active)
                .Select(cl => mapper.Map<CourseLinkDto>(cl))
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");
        }
    }
}