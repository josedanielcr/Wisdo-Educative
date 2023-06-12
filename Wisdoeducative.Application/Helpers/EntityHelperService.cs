using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.Common.Interfaces.Helpers;

namespace Wisdoeducative.Application.Helpers
{
    public class EntityHelperService : IEntityHelperService
    {
        public EntityHelperService(){}

        public bool AreAnyPropertiesNull(object obj, params string[] propertiesToCheck)
        {
            if (propertiesToCheck.Length == 0)
            {
                var properties = obj.GetType().GetProperties();

                return properties.Any(prop => prop.GetValue(obj) == null);
            }
            else
            {
                foreach (var property in propertiesToCheck)
                {
                    PropertyInfo propInfo = obj.GetType().GetProperty(property) 
                        ?? throw new Exception($"Property {property} not found on {obj.GetType().Name}");
                    if (propInfo.GetValue(obj) == null)
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
