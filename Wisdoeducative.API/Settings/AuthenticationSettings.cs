using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.Extensions.Configuration;
using Wisdoeducative.Application.Common.Settings;

namespace Wisdoeducative.API.Settings
{
    public static class AuthenticationSettings
    {
        public static IServiceCollection AddAuthenticationSettings(this IServiceCollection services,
        IConfiguration configuration)
        {

            AzureAdB2CSettings azureAdB2CSettings = getAzureAdB2CSettings(configuration);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApp(microsoftIdentityOptions =>
            {
                microsoftIdentityOptions.Instance = azureAdB2CSettings.Instance!;
                microsoftIdentityOptions.Domain = azureAdB2CSettings.Domain;
                microsoftIdentityOptions.ClientId = azureAdB2CSettings.ClientId;
                microsoftIdentityOptions.SignUpSignInPolicyId = azureAdB2CSettings.SignUpSignInPolicyId;
            });

            return services;
        }

        private static AzureAdB2CSettings getAzureAdB2CSettings(IConfiguration configuration)
        {
            return new AzureAdB2CSettings {
                Instance = configuration["AzureAdB2CInstance"],
                Domain = configuration["AzureAdB2CDomain"],
                ClientId = configuration["AzureAdB2CClientId"],
                SignUpSignInPolicyId = configuration["AzureAdB2CSignUpSignInPolicyId"]
            };
        }
    }
}