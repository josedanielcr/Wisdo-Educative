using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.Common.Exceptions
{
    public class UnauthorizedException : Exception
    {
        public string Code { get; set; } = string.Empty;
        public UnauthorizedException(string message, string code) : base(message)
        {
            Code = code;
        }

        public UnauthorizedException(string message, Exception innerException, string code) : base(message, innerException)
        {
            Code = code;
        }

        public UnauthorizedException()
        {
        }
    }
}