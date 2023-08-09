using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Domain.Histories
{
    public class CoursePrerequisiteHistory : BaseEntity
    {
        public Course CourseDto { get; set; }
        public int CourseId { get; set; }
        public Course PrerequisiteOfDto { get; set; }
        public int PrerequisiteOfId { get; set; }
        public int CoursePrerequisiteId { get; set; }
    }
}