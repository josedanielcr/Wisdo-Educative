using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Web.Resource;

namespace Wisdoeducative.API.Helpers
{
    public class ControllerHelper : IControllerHelper
    {
        private readonly IConfiguration configuration;

        public ControllerHelper(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        
        public void HasRequiredScopes(Dictionary<string, string> requiredScopes, HttpContext context)
        {
            context.VerifyUserHasAnyAcceptedScope(requiredScopes.Values.ToArray());
        }

        public Dictionary<string, string> LoadRequiredScopes()
        {
            var scopesSection = configuration.GetSection("Scopes");
            var requiredScopes = new Dictionary<string, string>();

            foreach (var scopeSection in scopesSection.GetChildren())
            {
                var scopeName = scopeSection.Key;
                var scopeValue = scopeSection.Value;

                requiredScopes.Add(scopeName, scopeValue!);
            }

            return requiredScopes;
        }
    }
}