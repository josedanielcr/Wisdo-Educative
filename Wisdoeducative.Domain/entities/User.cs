using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Domain.Entities
{
    public class User : BaseEntity
    {
        public string B2cId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public Role Role { get; set; }
        public int RoleId { get; set; }
        public UserStatus UserStatus { get; set; }
    }
}