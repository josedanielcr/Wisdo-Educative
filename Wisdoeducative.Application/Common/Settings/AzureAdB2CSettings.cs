using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wisdoeducative.Application.Common.Settings
{
    public class AzureAdB2CSettings
    {
        public string? Instance { get; set; }
        public string? Domain { get; set; }
        public string? ClientId { get; set; }
        public string? SignUpSignInPolicyId { get; set; }
    }
}