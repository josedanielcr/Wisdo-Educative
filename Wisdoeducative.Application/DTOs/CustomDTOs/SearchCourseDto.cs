using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.DTOs.CustomDTOs
{
    public class SearchCourseDto
    {
        public string Name { get; set; }
        public bool IsFavorite { get; set; }
        public List<string> Statuses { get; set; }
    }
}