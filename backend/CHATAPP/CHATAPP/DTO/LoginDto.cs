using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class LoginDto
    {
        public string UserName { get; set; }
        public string password { get; set; }
    }
}
