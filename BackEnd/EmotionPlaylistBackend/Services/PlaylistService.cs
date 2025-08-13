using EmotionPlaylistBackend.Data;
using EmotionPlaylistBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace EmotionPlaylistBackend.Services
{
    public class PlaylistService : IPlaylistService
    {
        private readonly AppDbContext _context;

        public PlaylistService(AppDbContext context) {
            _context = context;
        }
        public async Task<ICollection<Song>> GeneratePlaylistForEmotionAsync(string emotion)
        {
            var songs = await _context.Songs
                .Include(s => s.Emotion)
                .Where(s => s.Emotion.Name.ToLower() == emotion.ToLower())
                .ToListAsync();


            var random = new Random();
            var randomizedSongs = songs.OrderBy(song => random.Next()).ToList();

            return randomizedSongs;
        }
    }
}
