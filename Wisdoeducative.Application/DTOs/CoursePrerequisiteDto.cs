using Posdea.Application.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Application.DTOs
{
    public class CoursePrerequisiteDto : IMapFrom<CoursePrerequisite>
    {
        public int Id { get; set; }
        public CourseDto CourseDto { get; set; }
        public int CourseId { get; set; }
        public CourseDto PrerequisiteOfDto { get; set; }
        public int PrerequisiteOfId { get; set; }
    }

}
