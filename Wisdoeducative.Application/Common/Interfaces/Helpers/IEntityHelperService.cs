using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface IEntityHelperService
    {
        bool AreAnyPropertiesNull(object obj, params string[] propertiesToCheck);
    }
}
