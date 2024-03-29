﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface ICourseEvaluationService
    {
        Task<CourseEvaluationDto> CreateCourseEvaluation(CourseEvaluationDto courseEvaluationDto, int courseId);
        Task<IEnumerable<CourseEvaluationDto>> GetAllCourseEvaluations(int courseId);
        Task<CourseEvaluationDto> GetCourseEvaluation(int courseEvaluationId);
        Task<IEnumerable<CourseEvaluationTaskDto>> GetCourseTasks(int courseId);
        Task<IEnumerable<CourseEvaluationTaskDto>> GetAllCourseEvaluationTasks(int courseEvaluationId);
        Task<CourseEvaluationTaskDto> CreateCourseEvaluationTask(int courseEvaluationId, CourseEvaluationTaskDto courseEvaluationTaskDto);

        Task<CourseEvaluationTaskDto> UpdateCourseEvaluationTask(int courseEvaluationTaskId, CourseEvaluationTaskDto courseEvaluationTaskDto);
        Task<CourseEvaluationTaskDto> CompleteCourseEvaluationTask(CourseEvaluationTaskDto courseEvaluationTaskDto);
        Task CompleteCourse(int courseId); 
    }
}
