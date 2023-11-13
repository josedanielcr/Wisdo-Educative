using Azure.Identity;
using Microsoft.Extensions.Configuration;
using Wisdoeducative.API.Middlewares;
using Wisdoeducative.API.Settings;
using Wisdoeducative.Infrastructure.Persistence;
using Wisdoeducative.Infrastructure.Settings;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

//Azure key vault configuration
var keyVaultEndpoint = builder.Configuration.GetSection("KeyVault:keyVaultEndpoint")?.Value;
builder.Configuration.AddAzureKeyVault(
    new Uri(keyVaultEndpoint!),
    new DefaultAzureCredential()
);

// Add services to the container.
builder.Services.AddApiSettings(builder.Configuration, MyAllowSpecificOrigins);
builder.Services.AddProjectStartUpSettings(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//initialize database
using (var scope = app.Services.CreateScope())
{
    var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDBContextInitializer>();
    await initialiser.InitialiseAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();