namespace Wisdoeducative.API.Helpers
{
    public interface IControllerHelper
    {
        Dictionary<string, string> LoadRequiredScopes();
        void HasRequiredScopes(Dictionary<string, string> requiredScopes, HttpContext context);
    }
}