using System.ComponentModel.DataAnnotations.Schema;

namespace EmotionPlaylistBackend.Models
{
    public class PlaylistSong
    {
        [ForeignKey("PlaylistId")]
        public int PlaylistId { get; set; }
        public Playlist Playlist { get; set; }

        [ForeignKey("SongId")]
        public int SongId { get; set; }
        public Song Song { get; set; }
    }
}