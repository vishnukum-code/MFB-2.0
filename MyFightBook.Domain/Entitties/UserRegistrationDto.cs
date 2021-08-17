using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFightBook.Domain.Entitties
{
   public class UserRegistrationDto: IdentityUser
    {
        [StringLength(50)]
        [Required]
        public string Firstname { get; set; }
        [StringLength(50)]
        [Required]
        public string Lastname { get; set; }
        public DateTime? Birthday { get; set; }

        [StringLength(50)]
        public string Gender { get; set; }
        [StringLength(250)]
        public string Address { get; set; }
        public string Address1 { get; set; }
        [StringLength(10)]
        public string PostCode { get; set; }
        [StringLength(100)]
        public string City { get; set; }
        [StringLength(100)]
        public string State { get; set; }

        [StringLength(50)]
        public string Country { get; set; }
    }
}
