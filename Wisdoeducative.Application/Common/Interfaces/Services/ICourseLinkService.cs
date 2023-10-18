using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Services
{
    public interface ICourseLinkService
    {
        Task<CourseLinkDto> GetCourseLink(int courseId);
        Task<CourseLinkDto> CreateCourseLink(CourseLinkDto courseLink);
        Task<CourseLinkDto> GetCourseLinkById(int CourseLinkId);
        Task<IEnumerable<CourseLinkDto>> GetCourseLinkByCourseId(int courseId);
        Task<bool> DeleteCourseLink(int courseLinkId);
        Task<CourseLinkDto> UpdateCourseLink(int CourseLinkId, CourseLinkDto courseLinkDto);
        Task<IEnumerable<CourseLinkDto>> GetCourseLinksByFilters(CourseLinkFiltersDto courseLinkFiltersDto);
    }
}