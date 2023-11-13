using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Helpers;
using Wisdoeducative.Application.Common.Interfaces.Services;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.Services
{
    public class MenuService : IMenuService
    {
        private readonly IApplicationDBContext dBContext;
        private readonly IMapper mapper;
        private readonly ISubscriptionHelperService subscriptionHelper;
        private readonly IUserHelperService userHelper;

        public MenuService(IApplicationDBContext dBContext,
            IMapper mapper,
            ISubscriptionHelperService subscriptionHelper,
            IUserHelperService userHelper)
        {
            this.dBContext = dBContext;
            this.mapper = mapper;
            this.subscriptionHelper = subscriptionHelper;
            this.userHelper = userHelper;
        }

        public async Task<MenuOptionDto> CreateMenuOption(MenuOptionDto menuOption, int subscriptionId,
            int roleId)
        {
            using var transaction = dBContext.Database.BeginTransaction();
            try
            {

                MenuOption dbMenuOption = mapper.Map<MenuOption>(menuOption);
                dBContext.MenuOptions.Add(dbMenuOption);
                await dBContext.SaveChangesAsync();

                //add connection
                SubscriptionRoleMenuOption subscriptionRoleMenu = new SubscriptionRoleMenuOption
                {
                    SubscriptionId = subscriptionId,
                    RoleId = roleId,
                    MenuOptionId = dbMenuOption.Id,
                    Status = Domain.Enums.EntityStatus.Active
                };

                dBContext.SubscriptionRoleMenuOptions.Add(subscriptionRoleMenu);
                await dBContext.SaveChangesAsync();

                transaction.Commit();

                return menuOption;
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
        }

        public async Task<IEnumerable<MenuOptionDto>> GetMenuOptions(int userId)
        {
            List<MenuOptionDto> menuOptions = new List<MenuOptionDto>();
            SubscriptionDto subscription = await subscriptionHelper.GetSubscriptionByUserId(userId);
            UserDto user = await userHelper.GetUser(userId);

            var menuOptionsDb = await dBContext.SubscriptionRoleMenuOptions
               .Where(mo => mo.SubscriptionId == subscription.Id)
               .Where(mo => mo.RoleId == user.RoleId)
               .Select(mo => mo.MenuOption)
               .ToListAsync();

            foreach (var menuOptionDb in menuOptionsDb)
            {
                menuOptions.Add(mapper.Map<MenuOptionDto>(menuOptionDb));
            }

            return menuOptions;
        }
    }
}