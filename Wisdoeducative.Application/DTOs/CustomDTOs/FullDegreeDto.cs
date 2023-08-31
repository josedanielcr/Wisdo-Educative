using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.DTOs.CustomDTOs
{
    public class FullDegreeDto
    {
        public UserDegreeDto UserDegreeDto { get; set; }
        public StudyPlanDTO studyPlanDTO { get; set; }
        public IEnumerable<StudyPlanTermDto> StudyPlanTermDtos { get; set; }
        public IEnumerable<CourseDto> courseDtos { get; set; }
    }
}
