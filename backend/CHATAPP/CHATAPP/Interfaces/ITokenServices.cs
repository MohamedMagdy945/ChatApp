using API.Entites;

namespace API.Interfaces
{
    public interface ITokenServices
    {
        string CreateToken(AppUser user);
    }
}
