using EmotionPlaylistBackend.Models;

namespace EmotionPlaylistBackend.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (!context.Emotions.Any())
            {
                var emotions = new[]
                {
                    new Emotion { Name = "Happy" },
                    new Emotion { Name = "Sad" },
                    new Emotion { Name = "Energetic" },
                    new Emotion { Name = "Calm" }
                };
                context.Emotions.AddRange(emotions);
                context.SaveChanges();

                var songs = new[]
                {
                    new Song { Title = "Happy Song 1", Artist = "Artist A", Url = "https://youtube.com", EmotionId = emotions[0].EmotionId },
                    new Song { Title = "Sad Song 1", Artist = "Artist B", Url = "https://youtube.com", EmotionId = emotions[1].EmotionId },
                    new Song { Title = "Energetic Song 1", Artist = "Artist C", Url = "https://youtube.com", EmotionId = emotions[2].EmotionId },
                    new Song { Title = "Calm Song 1", Artist = "Artist D", Url = "https://youtube.com", EmotionId = emotions[3].EmotionId }
                };
                context.Songs.AddRange(songs);
                context.SaveChanges();
            }
        }
    }
}
