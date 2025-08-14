using System.ComponentModel.DataAnnotations;

namespace EmotionPlaylistBackend.DTOs
{
    public class SavePlaylistDto
    {
        [Required]
        public string PlaylistName { get; set; }

        [Required]
        public List<int> SongIds { get; set; }
    }
}
