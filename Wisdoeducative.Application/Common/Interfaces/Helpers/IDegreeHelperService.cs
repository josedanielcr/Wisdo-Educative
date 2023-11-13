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
        bool IsDegreeInvalid(DegreeDto degree);
        bool AreDegreeDatesInvalid(UserDegreeConfigDTO degree);
        bool AreUserDegreePropertiesInvalid(UserDegreeConfigDTO userDegree);
        DegreeDto ParseUserDegreeDtoToDegree(UserDegreeConfigDTO userDegree);
    }
}
