// ✅ Add CORS service with specific origin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .WithOrigins("http://localhost:4200") // Specific origin
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
