using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.DTOs.CustomDTOs
{
    public class StudyTermCreationDto
    {
        public StudyPlanTermDto StudyPlanTermDto { get; set; }
        public IEnumerable<CourseDto> coursesDtos { get; set; }
    }
}