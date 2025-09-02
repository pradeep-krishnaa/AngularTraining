using BugTracker.Core.DTOs;
using BugTracker.Core.Exceptions;
using System.ComponentModel.DataAnnotations;

namespace BugTracker.API.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger, IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var correlationId = context.TraceIdentifier; // ✅ renamed to proper C# casing
            context.Response.ContentType = "application/json";

            int statusCode;
            string message;
            string? details = null;

            switch (exception)
            {
                case NotFoundException nf:
                    statusCode = StatusCodes.Status404NotFound;
                    message = nf.Message;
                    details = _env.IsDevelopment() ? nf.StackTrace : null;
                    break;

                case ValidationException ve:
                    statusCode = StatusCodes.Status400BadRequest;
                    message = ve.Message;
                    details = _env.IsDevelopment() ? ve.StackTrace : null;
                    break;

                default:
                    statusCode = StatusCodes.Status500InternalServerError;
                    message = "An unexpected error occurred."; // ✅ changed from "Not handled" to a user-friendly message
                    details = _env.IsDevelopment() ? exception.StackTrace : null;
                    break;
            }

            var error = new ErrorResponse
            {
                StatusCode = statusCode,
                Message = message,
                Details = details,
                CorrelationId = correlationId,
            };

            //logging the exception
            _logger.LogError(
                exception,
                "Unhandled Exception for {Method} {Path}. CorrelationId:{CorrelationId}",
                context.Request.Method,
                context.Request.Path,
                correlationId);

            context.Response.StatusCode = statusCode;
            var json = System.Text.Json.JsonSerializer.Serialize(error);
            await context.Response.WriteAsync(json);
        }
    }
}
