using Microsoft.AspNetCore.Identity;

namespace API.Entites
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
