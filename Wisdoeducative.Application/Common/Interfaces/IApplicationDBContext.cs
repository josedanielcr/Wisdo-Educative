using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.Common.Interfaces
{
    public interface IApplicationDBContext
    {
        Task<int> SaveChangesAsync();
    }
}
