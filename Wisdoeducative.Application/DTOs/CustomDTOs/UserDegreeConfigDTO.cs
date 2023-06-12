using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.DTOs.CustomDTOs
{
    public class UserDegreeConfigDTO
    {
        public int UserId { get; set; }
        public int DegreeId { get; set; }
        public int InstitutionId { get; set; }
        public string Schedule { get; set; }
    }
}