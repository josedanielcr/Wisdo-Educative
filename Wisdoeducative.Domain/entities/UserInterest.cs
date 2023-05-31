using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class UserInterest : BaseEntity
    {
        public Interest? Interest { get; set; }
        public int InterestId { get; set; }
        public User? User { get; set; }
        public int UserId { get; set; }
        public EntityStatus Status { get; set; }
    }
}