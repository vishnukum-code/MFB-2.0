using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyFightBook.Contracts;
using MyFightBook.Infrastructure;
using MyFightBook.Services;
using System;

namespace MyFightBook.Extensions
{
    public static class ServiceExtension
    {
        private const string ConnectionStringName = "DefaultConnection";
        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString(ConnectionStringName);
            var commandTimeout = (int)TimeSpan.FromMinutes(20).TotalSeconds;

            services.AddDbContextPool<ApplicationDbContext>(o =>
            {
                o.UseSqlServer(connectionString, sqlOpt => sqlOpt.CommandTimeout(commandTimeout));
            });
        }

        public static void AddDefaultIdentity(this IServiceCollection services)
        {
            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>();
        }
        public static void IdentityOptions(this IServiceCollection services)
        {
            services.Configure<IdentityOptions>(option =>
            {
                option.Password.RequireDigit = false;
                option.Password.RequireLowercase = false;
                option.Password.RequireUppercase = false;
                option.Password.RequireNonAlphanumeric = false;
                option.Password.RequiredLength = 4;
            });
        }
        public static void ConfigureDependencies(this IServiceCollection services)
        {
            services.AddScoped<IUserRegistration, UserRegistration>();
            services.AddScoped<IUserLogin, UserLogin>();
        }
    }
}
