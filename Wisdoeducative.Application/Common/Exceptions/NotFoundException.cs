using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.Common.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string name, object key) : base($"Entity \"{name}\" ({key}) was not found.")
        {
        }

        public NotFoundException(string name, object key, string message) : base($"Entity \"{name}\" ({key}) was not found. {message}")
        {
        }

        public NotFoundException(string name, object key, string message, Exception innerException) : base($"Entity \"{name}\" ({key}) was not found. {message}", innerException)
        {
        }
    }
}
