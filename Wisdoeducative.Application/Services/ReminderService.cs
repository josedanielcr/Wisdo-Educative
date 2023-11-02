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
    public class ReminderService : IReminderService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly IEntityHelperService entityHelperService;

        public ReminderService(IApplicationDBContext dBContext,
            IMapper mapper,
            IEntityHelperService entityHelperService)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.entityHelperService = entityHelperService;
        }
        public async Task<ReminderDto> CreateReminderAsync(ReminderDto reminderDto)
        {
            string[] propertiesToCheck = new string[] { "CourseEvaluationTaskId", "Name", "Date" };
            if (entityHelperService.AreAnyPropertiesNull(reminderDto, propertiesToCheck))
            {
                throw new BadRequestException(ErrorMessages.InvalidReminderData, "InvalidReminderData");
            }
            Reminder reminder = mapper.Map<Reminder>(reminderDto);
            reminder.IsCompleted = false;
            reminder.Status = Domain.Enums.EntityStatus.Active;
            dBContext.Reminders.Add(reminder);
            await dBContext.SaveChangesAsync();
            return await GetReminderByIdAsync(reminder.Id);
        }

        public async Task DeleteReminderAsync(int id)
        {
            ReminderDto reminder = await GetReminderByIdAsync(id);
            Reminder reminderdb = mapper.Map<Reminder>(reminder);
            reminderdb.Status = Domain.Enums.EntityStatus.Inactive;
            dBContext.Entry(reminderdb).State = EntityState.Modified;
            await dBContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<ReminderDto>> GetAllRemindersAsync(int studyPlanId)
        {
            await CheckReminderExpiration(studyPlanId);
            return await dBContext.Reminders
                .Where(r => r.CourseEvaluationTask!.CourseEvaluation!
                    .Course.StudyPlanTerm.StudyPlanId == studyPlanId)
                .Where(r => r.Status == EntityStatus.Active)
                .Where(r => r.IsCompleted == false)
                .Include(r => r.CourseEvaluationTask)
                .Select(r => mapper.Map<ReminderDto>(r))
                .ToListAsync();
        }

        private async Task CheckReminderExpiration(int studyPlanId)
        {
            List<Reminder> reminderDtos = new List<Reminder>();

            reminderDtos = await dBContext.Reminders
                .Where(r => r.CourseEvaluationTask!.CourseEvaluation!
                    .Course.StudyPlanTerm.StudyPlanId == studyPlanId)
                .Where(r => r.Status == EntityStatus.Active)
                .Where(r => r.IsCompleted == false)
                .Include(r => r.CourseEvaluationTask)
                .ToListAsync();

            foreach (Reminder d in reminderDtos)
            {
                if (DateTime.Now.Day > d.Date.Day)
                {
                    d.Status = EntityStatus.Inactive;
                    dBContext.Entry(d).State = EntityState.Modified;
                }
            }
            await dBContext.SaveChangesAsync();
        }

        public async Task<ReminderDto> GetReminderByIdAsync(int id)
        {
            return await dBContext.Reminders
                .Where(r => r.Id == id)
                .Where(r => r.Status == Domain.Enums.EntityStatus.Active)
                .Include(r => r.CourseEvaluationTask)
                .Select(r => mapper.Map<ReminderDto>(r))
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException(ErrorMessages.EntityNotFound, "EntityNotFound");
        }

        public async Task<ReminderDto> UpdateReminderAsync(ReminderDto reminderDto)
        {
            string[] propertiesToCheck = new string[] { "CourseEvaluationTaskId", "Name", "Date" };
            if (entityHelperService.AreAnyPropertiesNull(reminderDto, propertiesToCheck))
            {
                throw new BadRequestException(ErrorMessages.InvalidReminderData, "InvalidReminderData");
            }

            ReminderDto reminder = await GetReminderByIdAsync(reminderDto.Id);
            Reminder reminderdb = mapper.Map<Reminder>(reminder);
            //update all it's data
            reminderdb.Name = reminderDto.Name;
            reminderdb.IsCompleted = reminderDto.IsCompleted;
            reminderdb.Status = (EntityStatus)Enum.Parse(typeof(EntityStatus), reminderDto.Status!,true);
            dBContext.Entry(reminderdb).State = EntityState.Modified;
            await dBContext.SaveChangesAsync();
            return await GetReminderByIdAsync(reminderdb.Id);
        }
    }
}