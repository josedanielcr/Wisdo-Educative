using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Common
{
    public class BaseAuditableEntity : BaseEntity
    {
        public DateTime Date { get; set; }
        public EntityChangeTypes EntityChangeType { get; set; }
        public string ModifiedByUser { get; set; }
    }
}