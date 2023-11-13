using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.Common.Exceptions
{
    public class NotFoundException : Exception
    {
        public string Code { get; set; }
        public NotFoundException(string message, string code) : base(message)
        {
            Code = code;
        }

        public NotFoundException() : base()
        {
        }

        public NotFoundException(string message, Exception innerException, string code) : base(message, innerException)
        {
            Code = code;
        }
    }
}
