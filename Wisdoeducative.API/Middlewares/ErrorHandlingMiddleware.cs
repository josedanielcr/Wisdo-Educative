using System.Net;
using System.Text.Json;
using Wisdoeducative.Application.Common.Exceptions;

namespace Wisdoeducative.API.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger, IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
                if (context.Response.StatusCode == 404)
                {
                    await HandleExceptionAsync(context, new Exception("Not Found"));
                }
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
                LogExceptionDetails(ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError;
            var message = exception.Message;
            var stackTrace = exception.StackTrace;

            if (exception is NotFoundException) code = HttpStatusCode.NotFound;
            else if (exception is BadRequestException) code = HttpStatusCode.BadRequest;
            else if (exception is UnauthorizedException) code = HttpStatusCode.Unauthorized;
            else if (exception is ForbiddenException) code = HttpStatusCode.Forbidden;
            else if (exception is NotImplementedException) code = HttpStatusCode.NotImplemented;
            else if (exception is TimeoutException) code = HttpStatusCode.RequestTimeout;
            else if (exception is InternalServerErrorException) code = HttpStatusCode.InternalServerError;

            var result = JsonSerializer.Serialize(
                new { error = message, 
                    stackTrace = stackTrace,
                    statusCode = (int)code }
            );
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            await context.Response.WriteAsync(result);
        }

        private void LogExceptionDetails(Exception exception)
        {
            var logMessage = $"Unhandled exception occurred: {exception.Message}";
            if (_env.IsDevelopment())
            {
                logMessage += $"\nStackTrace: {exception.StackTrace}";
            }

            _logger.LogError(exception, logMessage);
        }
    }
}