using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.DTOs.CustomDTOs
{
    public class UserSetupDTO
    {
        public UserDto User { get; set; }
        public List<InterestDto> InterestsDtos { get; set; }
        public UserDegreeConfigDTO UserDegreConfig { get; set; }
    }
}
