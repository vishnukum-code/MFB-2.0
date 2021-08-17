using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using MyFightBook.Contracts;
using MyFightBook.Modals;
using System.Text;
using System.Threading.Tasks;

namespace MyFightBook.Services
{
    public class EmailService : IEmailService
    {
        private readonly UserManager<IdentityUser> _userManager;
        public EmailService(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task<RegisterResult> SendResetPasswordEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                return new RegisterResult { Userid = null, Code = code };
            }
            return new RegisterResult { Userid = null, Code = null };
        }

        public async Task<Result> ResetPasswordAsync(ResetPassword resetPassword)
        {
            var user = await _userManager.FindByEmailAsync(resetPassword.Email);
            if (user != null)
            {
                var result = await _userManager.ResetPasswordAsync(user, resetPassword.Code, resetPassword.NewPassword);
                if (result.Succeeded)
                {
                    return new Result { Status = true, Message = "Your password has been reset" };
                }
               
            }
            return new Result { Status = false, Message = "Email Not Exists" };
        }
    }
}
