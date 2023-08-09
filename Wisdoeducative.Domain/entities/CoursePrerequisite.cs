using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;

namespace Wisdoeducative.Domain.Entities
{
    public class CoursePrerequisite : BaseEntity
    {
        public Course Course { get; set; }
        public int CourseId { get; set; }
        public Course PrerequisiteOf { get; set; }
        public int PrerequisiteOfId { get; set; }
    }
}