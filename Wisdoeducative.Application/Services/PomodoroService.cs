using AutoMapper;
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
using Wisdoeducative.Application.Helpers;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Services
{
    public class PomodoroService : IPomodoroService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IEntityHelperService entityHelperService;

        public PomodoroService(IApplicationDBContext dBContext, 
            IMapper mapper,
            IEntityHelperService entityHelperService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.entityHelperService = entityHelperService;
        }

        public async Task CreatePomodoroSession(PomodoroDto pomodoroDto)
        {
            using var transaction = dBContext.Database.BeginTransaction();
            try
            {
                if (!ValidatePomodoro(pomodoroDto))
                {
                    throw new BadRequestException(ErrorMessages.InvalidPomodoroSession, "InvalidPomodoroSession");
                }

                DateTime initialTime = pomodoroDto.InitialTime;
                DateTime endTime = pomodoroDto.EndTime;
                TimeSpan timeSpan = endTime - initialTime;

                if(timeSpan.TotalMinutes < 25)
                {
                    pomodoroDto.Status = PomodoroStatus.Uncompleted.ToString();
                } else
                {
                    pomodoroDto.Status = PomodoroStatus.Completed.ToString();
                }

                Pomodoro pomodoro = mapper.Map<Pomodoro>(pomodoroDto);
                pomodoro.Id = default;

                dBContext.Pomodoros.Add(pomodoro);
                await dBContext.SaveChangesAsync();
                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
        }

        private bool ValidatePomodoro(PomodoroDto pomodoroDto)
        {
            string[] propertiesToCheck = new string[] { "CourseEvaluationTaskId", "InitialTime", "EndTime" };
            if (entityHelperService.AreAnyPropertiesNull(pomodoroDto, propertiesToCheck))
            {
                return false;
            }
            if (pomodoroDto.InitialTime > pomodoroDto.EndTime) return false;
            return true;
        }
    }
}
