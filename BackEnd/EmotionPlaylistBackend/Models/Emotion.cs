using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmotionPlaylistBackend.Models
{
    public class Emotion
    {
        public int EmotionId { get; set; }
        public string Name { get; set; }

        public ICollection<Song> Songs { get; set; }
    }
}
