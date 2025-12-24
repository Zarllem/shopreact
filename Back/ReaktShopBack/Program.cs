using CoreData.Contexts;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Converters;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers()
    .AddNewtonsoftJson(options=>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.Converters.Add(new StringEnumConverter());
    });

builder.Services.AddDbContext<ShopReactContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("ShopReactData")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()!)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});


var app = builder.Build();
//app.MapGet("/", () => "hello");
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowFrontend");

app.UseEndpoints(endpoint =>
{
    endpoint.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
});

app.Run();
