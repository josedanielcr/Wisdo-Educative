using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Infrastructure.Persistence
{
    public class ApplicationDBContextInitializer
    {
        private readonly ApplicationDBContext dBContext;
        private readonly ILogger<ApplicationDBContext> logger;

        public ApplicationDBContextInitializer(ApplicationDBContext dBContext, ILogger<ApplicationDBContext> logger)
        {
            this.dBContext = dBContext;
            this.logger = logger;
        }

        public async Task InitialiseAsync()
        {
            try
            {
                if (dBContext.Database.IsSqlServer())
                {
                    await dBContext.Database.MigrateAsync();
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error during database initialization");
                throw;
            }
        }
    }
}