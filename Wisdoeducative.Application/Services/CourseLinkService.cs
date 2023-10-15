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
using Wisdoeducative.Domain.Enums;

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
            
            CourseLink newCourseLink = mapper.Map<CourseLink>(courseLink);
            dBContext.CourseLinks.Add(newCourseLink);
            await dBContext.SaveChangesAsync();
            return await GetCourseLinkById(newCourseLink.Id);
        }

        public async Task<bool> DeleteCourseLink(int courseLinkId)
        {
            CourseLink courseLink = dBContext.CourseLinks
                .Where(cl => cl.Id == courseLinkId)
                .FirstOrDefault()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");

            dBContext.CourseLinks.Remove(courseLink);
            await dBContext.SaveChangesAsync();
            return true;
        }

        public async Task<CourseLinkDto> GetCourseLink(int courseEvaluationTaskId)
        {
            return await dBContext.CourseLinks
                .Where(cl => cl.CourseEvaluationTaskId == courseEvaluationTaskId)
                .Where(cl => cl.Status == Domain.Enums.EntityStatus.Active)
                .Include(cl => cl.CourseEvaluationTask)
                .Select(cl => mapper.Map<CourseLinkDto>(cl))
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");
        }

        public async Task<IEnumerable<CourseLinkDto>> GetCourseLinkByCourseId(int courseId)
        {
            var result = await dBContext.CourseLinks
                .Where(cl => cl.CourseEvaluationTask!.CourseEvaluation!.CourseId == courseId)
                .Where(cl => cl.Status == Domain.Enums.EntityStatus.Active)
                .Include(cl => cl.CourseEvaluationTask)
                .Select(cl => mapper.Map<CourseLinkDto>(cl))
                .ToListAsync()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");

            List<CourseLinkDto> courseLinkDtos = new List<CourseLinkDto>();
            foreach (var courseLink in result)
            {
                courseLinkDtos.Add(mapper.Map<CourseLinkDto>(courseLink));
            };

            return courseLinkDtos;
        }

        public async Task<CourseLinkDto> GetCourseLinkById(int CourseLinkId)
        {
            return await dBContext.CourseLinks
                .Where(cl => cl.Id == CourseLinkId)
                .Where(cl => cl.Status == Domain.Enums.EntityStatus.Active)
                .Include(cl => cl.CourseEvaluationTask)
                .Select(cl => mapper.Map<CourseLinkDto>(cl))
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");
        }

        public async Task<CourseLinkDto> UpdateCourseLink(int CourseLinkId, CourseLinkDto courseLinkDto)
        {
            CourseLink courseLink = dBContext.CourseLinks
                .Where(cl => cl.Id == CourseLinkId)
                .FirstOrDefault()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");

            if (!courseLinkHelper.ValidateCourseLink(courseLinkDto))
            {
                throw new BadRequestException(ErrorMessages.NullProperties, "NullProperties");
            }

            courseLink.Name = courseLinkDto.Name;
            courseLink.Link = courseLinkDto.Link;
            courseLink.CourseEvaluationTaskId = courseLinkDto.CourseEvaluationTaskId;
            if(courseLinkDto.Status != null) courseLink.Status = (EntityStatus)Enum.Parse(typeof(EntityStatus), courseLinkDto.Status!);
            courseLink.Platform = (CourseLinkPlatform)Enum.Parse(typeof(CourseLinkPlatform), courseLinkDto.Platform!);

            dBContext.Entry(courseLink).State = EntityState.Modified;
            await dBContext.SaveChangesAsync();

            return await GetCourseLinkById(courseLink.Id);
        }
    }
}