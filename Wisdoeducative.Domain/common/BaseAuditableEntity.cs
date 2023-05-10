using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.enums;

namespace Wisdoeducative.Domain.Common
{
    public class BaseAuditableEntity : BaseEntity
    {
        public DateTime CreationDate { get; set; }
        public DateTime ChangeDate { get; set; }
        public EntityChangeTypes EntityChangeType { get; set; }
        public int ModifiedByUserId { get; set; }
        public User? ModifiedByUser { get; set; }
    }
}