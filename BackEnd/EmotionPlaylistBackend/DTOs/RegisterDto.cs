using System.ComponentModel.DataAnnotations;
namespace EmotionPlaylistBackend.DTOs
{
    public class RegisterDto
    {
        [Required]
        public String UserName {  get; set; }

        [Required]
        public String Password { get; set; }

        [Required]
        [EmailAddress]
        public String Email { get; set; }


    }
}
