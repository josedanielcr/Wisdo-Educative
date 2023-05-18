using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.Common.Interfaces.Historics
{
    public interface IEntityHistoryService<T>
    {
        void SaveChanges(T entity, int entityId, EntityChangeTypes type, string modifiedBy);
    }
}   