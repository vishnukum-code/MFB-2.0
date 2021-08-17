using MyFightBook.Modals;
using System.Threading.Tasks;

namespace MyFightBook.Contracts
{
    public interface IUserLogin
    {
        Task<Result> IsUserLoged(Login login);
        Task<Result> EmailVerficationF(string id,string code);
        Task<Result> SignOutF();
       // Task<Result> ForgotPassword(FogotPSDModel fogotPSDModel);
    }
}
