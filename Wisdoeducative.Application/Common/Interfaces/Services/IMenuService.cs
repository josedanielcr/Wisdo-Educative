using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface IMenuService
    {
        Task<IEnumerable<MenuOptionDto>> GetMenuOptions(int userId);
        Task<MenuOptionDto> CreateMenuOption(MenuOptionDto menuOption, int subscriptionId,
            int roleId);
    }
}