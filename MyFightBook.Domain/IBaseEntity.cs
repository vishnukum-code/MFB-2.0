using System;

namespace MyFightBook.Domain
{
    public interface IBaseEntity
    {
        int Id { get; set; }
        DateTime DateCreated { get; set; }
    }
}
