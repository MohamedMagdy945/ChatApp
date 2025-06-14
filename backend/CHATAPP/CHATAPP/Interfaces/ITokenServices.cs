using API.Entites;

namespace API.Interfaces
{
    public interface ITokenServices
    {
        Task<string> CreateToken(AppUser user);
    }
}
