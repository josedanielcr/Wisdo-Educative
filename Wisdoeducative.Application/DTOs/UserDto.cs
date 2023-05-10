using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.DTOs
{
    public class UserDto : IMapFrom<User>
    {
        public int Id { get; set; }
        public string B2cId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string UserStatus { get; set; }
        public AddressDto Address { get; set; }
        public int AddressId { get; set; }
    }
}