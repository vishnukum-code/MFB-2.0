using MyFightBook.Modals;
using System.Threading.Tasks;

namespace MyFightBook.Contracts
{
    public interface IEmailService
    {
        Task<RegisterResult> SendResetPasswordEmail(string email);
        Task<Result> ResetPasswordAsync(ResetPassword resetPassword);
    }
}
