using AutoMapper;
using MyFightBook.Domain.Entitties;
using MyFightBook.Modals;

namespace MyFightBook.AutoMapperProfile
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserRegistrationDto, User>().ReverseMap();
        }
    }
}
