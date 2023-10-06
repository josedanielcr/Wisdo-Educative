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
    public class CourseEvaluationService : ICourseEvaluationService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly ICourseEvaluationHelperService courseEvaluationHelperService;

        public CourseEvaluationService(IApplicationDBContext dBContext,
            IMapper mapper,
            ICourseEvaluationHelperService courseEvaluationHelperService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.courseEvaluationHelperService = courseEvaluationHelperService;
        }

        public async Task<CourseEvaluationDto> CreateCourseEvaluation(CourseEvaluationDto courseEvaluationDto, int courseId)
        {
            using var transaction = dBContext.Database.BeginTransaction();
            try
            {
                CourseEvaluation courseEvaluation = mapper.Map<CourseEvaluation>(courseEvaluationDto);
                if (!courseEvaluationHelperService.IsCourseEvaluationCreationDataValid(courseEvaluation)
                    || courseId == 0)
                {
                    throw new BadRequestException(ErrorMessages.NullProperties, "NullProperties");
                }

                IEnumerable<CourseEvaluationDto> courseEvaluations 
                    = await GetAllCourseEvaluations(courseId);

                if (!courseEvaluationHelperService.IsCourseEvaluationWeightValid(courseEvaluations, 
                    courseEvaluationDto.Weight))
                {
                    throw new BadRequestException(ErrorMessages.InvalidWeight, "InvalidWeight");
                }

                dBContext.CourseEvaluations.Add(courseEvaluation);
                await dBContext.SaveChangesAsync();
                transaction.Commit();
                return mapper.Map<CourseEvaluationDto>(courseEvaluation);
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
        }

        public async Task<CourseEvaluationTaskDto> CreateCourseEvaluationTask(int courseEvaluationId, CourseEvaluationTaskDto courseEvaluationTaskDto)
        {
            using var transaction = dBContext.Database.BeginTransaction();
            try
            {
                CourseEvaluationTask courseEvaluationTask = mapper.Map<CourseEvaluationTask>(courseEvaluationTaskDto);
                if(!courseEvaluationHelperService.IsCourseEvalutionTaskCreationDataValid(courseEvaluationTask)
                    || courseEvaluationId == 0)
                {
                    throw new BadRequestException(ErrorMessages.NullProperties, "NullProperties");
                }

                courseEvaluationTask.CourseEvaluationId = courseEvaluationId;
                dBContext.CourseEvaluationTasks.Add(courseEvaluationTask);
                await dBContext.SaveChangesAsync();
                transaction.Commit();
                return mapper.Map<CourseEvaluationTaskDto>(courseEvaluationTask);
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
        }

        public async Task<IEnumerable<CourseEvaluationDto>> GetAllCourseEvaluations(int courseId)
        {
            return await dBContext.CourseEvaluations
                .Where(ce => ce.CourseId == courseId)
                .Where(ce => ce.Status == Domain.Enums.EntityStatus.Active)
                .Select(ce => mapper.Map<CourseEvaluationDto>(ce))
                .ToListAsync();
        }

        public async Task<IEnumerable<CourseEvaluationTaskDto>> GetAllCourseEvaluationTasks(int courseEvaluationId)
        {
            return await dBContext.CourseEvaluationTasks
                .Where(cet => cet.CourseEvaluationId == courseEvaluationId)
                .Where(cet => cet.Status == Domain.Enums.EntityStatus.Active)
                .Select(cet => mapper.Map<CourseEvaluationTaskDto>(cet))
                .ToListAsync();
        }
    }
}