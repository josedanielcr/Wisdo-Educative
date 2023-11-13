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
using Wisdoeducative.Domain.Common;
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

                IEnumerable<CourseEvaluationTaskDto> courseEvaluationTasks
                    = await GetAllCourseEvaluationTasks(courseEvaluationId);

                CourseEvaluationDto courseEvaluationDto = await GetCourseEvaluation(courseEvaluationId);

                if (!courseEvaluationHelperService.IsCourseEvaluationTaskWeightValid(
                    courseEvaluationTasks,courseEvaluationTaskDto.Weight, courseEvaluationDto))
                {
                    throw new BadRequestException(ErrorMessages.InvalidEvaluationTaskWeight, "InvalidEvaluationTaskWeight");
                }

                if(!courseEvaluationHelperService.IsCourseEvaluationTaskDatesValid(courseEvaluationTaskDto))
                {
                    throw new BadRequestException(ErrorMessages.InvalidEvaluationTaskDates, "InvalidEvaluationTaskDates");
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
                .Include(ce => ce.Tasks)
                .Select(ce => mapper.Map<CourseEvaluationDto>(ce))
                .ToListAsync();
        }

        public async Task<IEnumerable<CourseEvaluationTaskDto>> GetCourseTasks(int courseId)
        {
            return await dBContext.CourseEvaluationTasks
                    .Where(cet => cet.CourseEvaluation!.CourseId == courseId)
                    .Where(cet => cet.Status == Domain.Enums.EntityStatus.Active)
                    .Select(cet => mapper.Map<CourseEvaluationTaskDto>(cet))
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

        public async Task<CourseEvaluationDto> GetCourseEvaluation(int courseEvaluationId)
        {
            return await dBContext.CourseEvaluations
                .Where(ce => ce.Id == courseEvaluationId)
                .Where(ce => ce.Status == Domain.Enums.EntityStatus.Active)
                .Include(ce => ce.Tasks)
                .Select(ce => mapper.Map<CourseEvaluationDto>(ce))
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound"); ;
        }

        public async Task<CourseEvaluationTaskDto> UpdateCourseEvaluationTask(int courseEvaluationTaskId, CourseEvaluationTaskDto courseEvaluationTaskDto)
        {
            var taskEntity = mapper.Map<CourseEvaluationTask>(courseEvaluationTaskDto);
            dBContext.CourseEvaluationTasks.Attach(taskEntity);
            dBContext.Entry(taskEntity).State = EntityState.Modified;
            taskEntity.Name = courseEvaluationTaskDto.Name;
            taskEntity.Description = courseEvaluationTaskDto.Description;
            await dBContext.SaveChangesAsync();
            return mapper.Map<CourseEvaluationTaskDto>(taskEntity);
        }

        public async Task<CourseEvaluationTaskDto> CompleteCourseEvaluationTask(CourseEvaluationTaskDto courseEvaluationTaskDto)
        {

            var value = courseEvaluationTaskDto.TotalScore * courseEvaluationTaskDto.Weight / 100;

            if(value > courseEvaluationTaskDto.Weight)
            {
                throw new BadRequestException(ErrorMessages.InvalidEvaluationTaskWeight, "InvalidEvaluationTaskWeight");
            }

            var taskEntity = mapper.Map<CourseEvaluationTask>(courseEvaluationTaskDto);
            dBContext.CourseEvaluationTasks.Attach(taskEntity);
            dBContext.Entry(taskEntity).State = EntityState.Modified;
            taskEntity.Status = Domain.Enums.EntityStatus.Active;
            taskEntity.EvaluationStatus = Domain.Enums.CourseEvaluationStatus.Finished;
            taskEntity.TotalScore = taskEntity.TotalScore * taskEntity.Weight / 100;
            await dBContext.SaveChangesAsync();
            return mapper.Map<CourseEvaluationTaskDto>(taskEntity);
        }

        public async Task CompleteCourse(int courseId)
        {
            var course = await dBContext.Courses
                .Where(c => c.Id == courseId)
                .Where(c => c.status == Domain.Enums.EntityStatus.Active)
                .Include(c => c.StudyPlanTerm)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");

            var finalScore = 0;
            var evaluations = await GetAllCourseEvaluations(courseId);

            foreach (var evaluation in evaluations)
            {
                var tasks = await GetAllCourseEvaluationTasks(evaluation.Id);
                foreach (var task in tasks)
                {
                    finalScore += task.TotalScore;
                }
            }

            course.CurrentScore = finalScore.ToString();
            course.CourseStatus = Domain.Enums.CourseStatus.Finished;
            dBContext.Courses.Attach(course);
            dBContext.Entry(course).State = EntityState.Modified;

            await CheckTermProgress(course.StudyPlanTerm);

            await dBContext.SaveChangesAsync();
        }

        private async Task CheckTermProgress(StudyPlanTerm studyPlanTerm)
        {
            var courses = await dBContext.Courses
                .Where(c => c.StudyPlanTermId == studyPlanTerm.Id)
                .Where(c => c.status == Domain.Enums.EntityStatus.Active)
                .ToListAsync()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");

            var finishedCourses = 
                courses.Where(c => c.CourseStatus == Domain.Enums.CourseStatus.Finished).ToList();

            if (finishedCourses.Count+1 == courses.Count || finishedCourses.Count == courses.Count)
            {
                studyPlanTerm.StudyTermStatus = Domain.Enums.StudyTermStatus.Completed;
                dBContext.StudyPlanTerms.Attach(studyPlanTerm);
                dBContext.Entry(studyPlanTerm).State = EntityState.Modified;
                await SetNewCurrentStudyPlanTerm((int)studyPlanTerm.StudyPlanId, (int)studyPlanTerm.PeriodNumber);
            }
        }

        private async Task SetNewCurrentStudyPlanTerm(int studyPlanId, int periodNumber)
        {
            var studyPlanTerm = await dBContext.StudyPlanTerms
                .Where(spt => spt.StudyPlanId == studyPlanId)
                .Where(spt => spt.Status == Domain.Enums.EntityStatus.Active)
                .Where(spt => spt.PeriodNumber == periodNumber+1)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");

            if(studyPlanTerm != null)
            {

                studyPlanTerm.StudyTermStatus = Domain.Enums.StudyTermStatus.InProgress;
                dBContext.StudyPlanTerms.Attach(studyPlanTerm);
                dBContext.Entry(studyPlanTerm).State = EntityState.Modified;
                await SetStudyPlanTermCoursesToInProgress(studyPlanTerm.Id);
            }
        }

        private async Task SetStudyPlanTermCoursesToInProgress(int id)
        {
            var courses = await dBContext.Courses
                .Where(c => c.StudyPlanTermId == id)
                .Where(c => c.status == Domain.Enums.EntityStatus.Active)
                .ToListAsync()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");
            if(courses != null)
            {
                   foreach (var course in courses)
                {
                    course.CourseStatus = Domain.Enums.CourseStatus.InProgress;
                    dBContext.Courses.Attach(course);
                    dBContext.Entry(course).State = EntityState.Modified;
                }
            }
        }
    }
}