
using System.Text;
using API.Data;
using API.Entites;
using API.Extensions;
using API.Interfaces;
using API.Middleware;
using API.services;
using API.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CHATAPP
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();
            builder.Services.AddApplicationServices(builder.Configuration);
            builder.Services.AddCors();
            builder.Services.AddIdentityServices(builder.Configuration);
            builder.Services.AddSignalR();
            builder.Services.AddScoped<Seed>();


            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<DataContext>();
                    var userManager = services.GetRequiredService<UserManager<AppUser>>();
                    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
                    await context.Database.MigrateAsync();

                    var seeder = services.GetRequiredService<Seed>();
                    await Seed.SeedUsers(userManager, roleManager);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred during migration");
                }
            }



            app.UseMiddleware<ExceptionMiddleware>();

            app.UseHttpsRedirection();

            app.UseCors(x => x.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins("https://localhost:4200"));

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();
            app.MapHub<PresenceHub>("hubs/presence");   
            app.MapHub<MessageHub>("hubs/message");

            await app.RunAsync();
        }
    }
}
