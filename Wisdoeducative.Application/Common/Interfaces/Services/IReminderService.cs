using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface IReminderService
    {
        Task<IEnumerable<ReminderDto>> GetAllRemindersAsync(int studyPlanId);
        Task<ReminderDto> GetReminderByIdAsync(int id);
        Task<ReminderDto> CreateReminderAsync(ReminderDto reminderDto);
        Task<ReminderDto> UpdateReminderAsync(ReminderDto reminderDto);
        Task DeleteReminderAsync(int id);
    }
}
