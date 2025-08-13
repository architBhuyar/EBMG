using System.ComponentModel.DataAnnotations.Schema;

namespace EmotionPlaylistBackend.Models
{
    public class Song
    {
 
        public int SongId { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        public string Url { get; set; }

        public int EmotionId { get; set; }
        [ForeignKey("EmotionId")]
        public Emotion Emotion { get; set; }
    }
}
