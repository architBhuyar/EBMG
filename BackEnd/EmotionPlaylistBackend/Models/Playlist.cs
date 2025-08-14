using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmotionPlaylistBackend.Models
{
    public class Playlist
    {
        [Key]
        public int PlaylistId { get; set; }
        [Required]
        public string Name { get; set; } 
        public DateTime CreatedAt { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public IdentityUser User { get; set; }

        public ICollection<PlaylistSong> PlaylistSongs { get; set; }
    }
}