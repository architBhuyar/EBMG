using EmotionPlaylistBackend.Data;
using EmotionPlaylistBackend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmotionPlaylistBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaylistController : ControllerBase
    {

        private readonly IPlaylistService _playlistService;
        private readonly AppDbContext _context;

        public PlaylistController(IPlaylistService playlistService, AppDbContext context)
        {
            _playlistService = playlistService;
            _context = context;
        }

        [HttpGet("emotions")]
        public async Task<IActionResult> GetEmotions()
        {
            var emotions = await _context.Emotions.ToListAsync();
            var emo = emotions.Select(e => new
            {
                emotionId = e.EmotionId,
                name = e.Name,
            });
            return Ok(emo);
        }

        [HttpGet("{emotion}")]
        public async Task<IActionResult> GetPlaylist(String emotion)
        {
            var songs = await _playlistService.GeneratePlaylistForEmotionAsync(emotion);

            if (songs == null || !songs.Any())
            {
                return NotFound($"No songs found for the emotion: {emotion}");
            }

            var result = songs.Select(s => new
            {
                songId = s.SongId,
                title = s.Title,
                artist = s.Artist,
                url = s.Url
            });

            return Ok(result);
        }

    }
}
