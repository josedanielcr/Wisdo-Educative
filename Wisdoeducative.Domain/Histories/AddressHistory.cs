﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wisdoeducative.Domain.Common;
using Wisdoeducative.Domain.Entities;

namespace Wisdoeducative.Domain.Histories
{
    public class AddressHistory : BaseAuditableEntity
    {
        public Address? ChangedAddress { get; set; }
        public int ChangedAddressId { get; set; }
    }
}
