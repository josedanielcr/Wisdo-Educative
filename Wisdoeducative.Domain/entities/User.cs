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
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string? ProfileImage { get; set; }
        public Role? Role { get; set; }
        public int RoleId { get; set; }
        public UserCategory? Category { get; set; }
        public UserStatus UserStatus { get; set; }
    }
}