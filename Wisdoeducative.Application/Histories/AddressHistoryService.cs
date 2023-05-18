using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces;
using Wisdoeducative.Application.Common.Interfaces.Historics;
using Wisdoeducative.Application.Resources;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;
using Wisdoeducative.Domain.Histories;

namespace Wisdoeducative.Application.Histories
{
    public class AddressHistoryService : IEntityHistoryService<Address>
    {
        private readonly IApplicationDBContext dBContext;
        private readonly ILogger<AddressHistoryService> logger;

        public AddressHistoryService(IApplicationDBContext dBContext,
            ILogger<AddressHistoryService> logger)
        {
            this.dBContext = dBContext;
            this.logger = logger;
        }

        public void SaveChanges(Address entity, int addressId, EntityChangeTypes type, string modifiedBy)
        {
            try
            {
                dBContext.AddressHistories.Add(new AddressHistory
                {
                    Date = DateTime.Now,
                    EntityChangeType = type,
                    ModifiedByUser = modifiedBy,
                    ChangedAddressId = addressId,
                    ChangedAddress = entity
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"{ErrorMessages.HistorySaveErrorMessage}{entity}");
                throw;
            }
        }
    }
}