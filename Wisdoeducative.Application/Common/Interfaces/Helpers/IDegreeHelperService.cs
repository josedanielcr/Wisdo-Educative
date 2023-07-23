using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Application.DTOs;
using Wisdoeducative.Application.DTOs.CustomDTOs;

namespace Wisdoeducative.Application.Common.Interfaces.Helpers
{
    public interface IDegreeHelperService
    {
        Task<DegreeDto> GetById(int degreeId);
        Task ValidateUserDegreeProperties(UserDegreeConfigDTO userDegree);
        DegreeDto ParseUserDegreeDtoToDegree(UserDegreeConfigDTO userDegree);
    }
}
