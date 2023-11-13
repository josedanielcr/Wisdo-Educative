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
            var code = GetHttpStatusCode(exception);
            var message = exception.Message;
            var stackTrace = exception.StackTrace;
            string errorCode = GetErrorCode(exception);

            var result = CreateErrorResponse(message, stackTrace, code, errorCode);

            SetResponseProperties(context, code, result);
            await context.Response.WriteAsync(result);
        }

        private HttpStatusCode GetHttpStatusCode(Exception exception)
        {
            if (exception is NotFoundException) return HttpStatusCode.NotFound;
            if (exception is BadRequestException) return HttpStatusCode.BadRequest;
            if (exception is UnauthorizedException) return HttpStatusCode.Unauthorized;
            if (exception is ForbiddenException) return HttpStatusCode.Forbidden;
            if (exception is NotImplementedException) return HttpStatusCode.NotImplemented;
            if (exception is TimeoutException) return HttpStatusCode.RequestTimeout;
            if (exception is InternalServerErrorException) return HttpStatusCode.InternalServerError;

            return HttpStatusCode.InternalServerError;
        }

        private string GetErrorCode(Exception exception)
        {
            if (exception is NotFoundException notFoundException) return notFoundException.Code;
            if (exception is BadRequestException badRequestException) return badRequestException.Code;
            if (exception is UnauthorizedException unauthorizedException) return unauthorizedException.Code;
            if (exception is ForbiddenException forbiddenException) return forbiddenException.Code;
            if (exception is NotImplementedException notImplementedException) return "";
            if (exception is TimeoutException timeoutException) return "";
            if (exception is InternalServerErrorException internalServerErrorException) return internalServerErrorException.Code;

            return "";
        }

        private string CreateErrorResponse(string message, string stackTrace, HttpStatusCode code, string errorCode)
        {
            return JsonSerializer.Serialize(
                new
                {
                    error = message,
                    stackTrace = stackTrace,
                    statusCode = (int)code,
                    errorCode = errorCode
                }
            );
        }

        private void SetResponseProperties(HttpContext context, HttpStatusCode code, string result)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
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