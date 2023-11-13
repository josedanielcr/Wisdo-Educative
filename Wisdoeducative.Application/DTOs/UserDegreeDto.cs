using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;
using Wisdoeducative.Domain.Enums;

namespace Wisdoeducative.Application.DTOs
{
    public class UserDegreeDto : IMapFrom<UserDegree>
    {
        public int Id { get; set; }
        public DegreeDto? Degree { get; set; }
        public int DegreeId { get; set; }
        public UserDto? User { get; set; }
        public int UserId { get; set; }
        public InstitutionDto? Institution { get; set; }
        public int InstitutionId { get; set; }
        public int CurrentProgress { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsDefault { get; set; }
        public DateTime EndDate { get; set; }
        public string Schedule { get; set; }
        public string Status { get; set; }
    }
}