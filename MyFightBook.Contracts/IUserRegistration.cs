using MyFightBook.Modals;
using System.Threading.Tasks;

namespace MyFightBook.Contracts
{
    public interface IUserRegistration
    {
        Task<RegisterResult> UserRegistrationFAsync(User user);
    }
}
