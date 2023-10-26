using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.DTOs.CustomDTOs
{
    public class UserStatisticsDto
    {
        public int CurrentProgress { get; set; }
        public int AverageGrade { get; set; }
        public int CompletedCourses { get; set; }
        public int InProgressCourses { get; set; }
        public int NotStartedCourses { get; set; }
    }
}