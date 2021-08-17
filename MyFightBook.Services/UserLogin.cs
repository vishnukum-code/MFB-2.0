using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using MyFightBook.Contracts;
using MyFightBook.Modals;
using System;
using System.Text;
using System.Threading.Tasks;

namespace MyFightBook.Services
{
    public class UserLogin : IUserLogin
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<UserRegistration> _logger;
        public UserLogin(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, ILogger<UserRegistration> logger)
        {

            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        public async Task<Result> IsUserLoged(Login login)
        {
            try
            {
                if (login != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(login.Email, login.Password, login.RememberMe, lockoutOnFailure: false);
                    if (result.Succeeded)
                    {
                        _logger.LogInformation("User logged in.");
                        return new Result { Status = true, Message = login.RedirectUrl };
                    }
                    return new Result { Status = false, Message = "User not loggedin" };
                    if (result.IsLockedOut)
                    {
                        _logger.LogWarning("User account locked out.");
                        return new Result { Status = false, Message = "UserLokedOut" };
                    }
                    return new Result { Status = false, Message = "Invalid Login Attempt" };
                }
                return new Result { Status = false, Message = "Invalid Login Attempt" };
            }
            catch (Exception ex)
            {
                return new Result { Status = false, Message = "Invalid Login Attempt" };
            }

        }

        public async Task<Result> EmailVerficationF(string uid, string code)
        {
            try
            {
                if (uid != null && uid != string.Empty && code != null && code != string.Empty)
                {
                    var user = await _userManager.FindByIdAsync(uid);
                    if (user == null)
                    {
                        return new Result { Status = false, Message = $"Unable to load user with ID '{uid}'." };
                    }
                    var newcode = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
                    var result = await _userManager.ConfirmEmailAsync(user, newcode);
                    if (result.Succeeded)
                    {
                        return new Result { Status = true, Message = "Thank you for confirming your email." };
                    }
                    return new Result { Status = false, Message = "User not valid!" };
                }
                return new Result { Status = false, Message = "Something Wrong!" };
            }
            catch (Exception ex)
            {
                return new Result { Status = false, Message = ex.Message };
            }
        }

        public async Task<Result> SignOutF()
        {
            await _signInManager.SignOutAsync();
            return new Result { Status = true, Message = "User SignOut" };
        }
    }
}
