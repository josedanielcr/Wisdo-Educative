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
        public string DegreeName { get; set; }
        public string InstitutionName { get; set; }
        public string Schedule { get; set; }
        public string DegreeType { get; set; }
        public string StudyField { get; set; }
        public DateTime startDate { get; set; }
    }
}