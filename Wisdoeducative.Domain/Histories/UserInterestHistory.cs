using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Histories
{
    public class UserInterestHistory : BaseAuditableEntity
    {
        public int InterestId { get; set; }
        public int UserId { get; set; }
        public EntityStatus Status { get; set; }
        public int UserInterestId { get; set; }
    }
}