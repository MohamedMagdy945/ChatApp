namespace API.Entites
{
    public class UserLike
    {
        public AppUser SourceUser { get;set; }
        public int SourceUserId { get; set; }
        public AppUser LikedUsers { get; set; }
        public int LikedUserId { get; set; }
      
    }
}
