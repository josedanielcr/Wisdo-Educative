using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;

namespace Wisdoeducative.Domain.Entities
{
    public class User : BaseAuditableEntity
    {
        public string Username { get; set; }
        public string Email { get; set; }

    }
} 