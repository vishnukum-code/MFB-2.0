using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using MyFightBook.Contracts;
using MyFightBook.Domain.Entitties;
using MyFightBook.Modals;
using System;
using System.Text;
using System.Threading.Tasks;

namespace MyFightBook.Services
{
    public class UserRegistration : IUserRegistration
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IMapper _mapper;
        public UserRegistration(UserManager<IdentityUser> userManager, IMapper mapper)
        {

            _userManager = userManager;
            _mapper = mapper;
        }
        public async Task<RegisterResult> UserRegistrationFAsync(User userModal)
        {
            try
            {
                if (userModal != null)
                {
                    var userCheck = await _userManager.FindByEmailAsync(userModal.Email);
                    if (userCheck == null)
                    {
                        UserRegistrationDto userRegistrationDto = _mapper.Map<UserRegistrationDto>(userModal);
                        var res = await _userManager.CreateAsync(userRegistrationDto, userModal.Password);

                        if (res.Succeeded)
                        {
                            var code = await _userManager.GenerateEmailConfirmationTokenAsync(userRegistrationDto);
                            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                            return (new RegisterResult { Userid = userRegistrationDto.Id, Code = code });
                        }
                        else
                        {
                            return (new RegisterResult { Userid = string.Empty, Code = string.Empty });
                        }
                    }
                    return (new RegisterResult { Userid = string.Empty, Code = string.Empty });

                }
                return (new RegisterResult { Userid = string.Empty, Code = string.Empty });
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
