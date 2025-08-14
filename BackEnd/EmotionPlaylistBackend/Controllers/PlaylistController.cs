using EmotionPlaylistBackend.Data;
using EmotionPlaylistBackend.DTOs;
using EmotionPlaylistBackend.Models;
using EmotionPlaylistBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

        [HttpPost("save")]
        [Authorize]
        public async Task<IActionResult> SavePlaylist([FromBody] SavePlaylistDto savePlaylistDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null) 
            {
                return Unauthorized();
            }

            var playlist = new Playlist
            {
                Name = savePlaylistDto.PlaylistName,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Playlists.Add(playlist);
            await _context.SaveChangesAsync();

            // 3. Create the links between the new playlist and the songs
            foreach (var songId in savePlaylistDto.SongIds)
            {
                var playlistSong = new PlaylistSong
                {
                    PlaylistId = playlist.PlaylistId, // The ID from the playlist we just saved
                    SongId = songId
                };
                _context.PlaylistSongs.Add(playlistSong);
            }

            await _context.SaveChangesAsync(); // Save the new PlaylistSong entries

            return Ok(new { Message = "Playlist saved successfully!", PlaylistId = playlist.PlaylistId });
        }

        [HttpGet("my-playlists")]
        [Authorize] // This endpoint is protected.
        public async Task<IActionResult> GetMyPlaylists()
        {
           
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            // 2. Query the database for playlists belonging to this user.
            // We use .Include() and .ThenInclude() to also load the related songs.
            var playlists = await _context.Playlists
                .Where(p => p.UserId == userId)
                .Include(p => p.PlaylistSongs)       // Load the link table entries
                .ThenInclude(ps => ps.Song)         // Then, for each link, load the actual Song
                .OrderByDescending(p => p.CreatedAt) // Show newest first
                .ToListAsync();

            // 3. Shape the data into a clean DTO for the frontend.
            var result = playlists.Select(p => new
            {
                playlistId = p.PlaylistId,
                name = p.Name,
                createdAt = p.CreatedAt,
                songs = p.PlaylistSongs.Select(ps => new
                {
                    songId = ps.Song.SongId,
                    title = ps.Song.Title,
                    artist = ps.Song.Artist,
                    url = ps.Song.Url
                }).ToList()
            });

            return Ok(result);
        }

        [HttpDelete("{playlistId}")]
        [Authorize] // Protected endpoint
        public async Task<IActionResult> DeletePlaylist(int playlistId)
        {
            // 1. Get the current user's ID from their token.
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            // 2. Find the specific playlist, but ONLY if it belongs to the current user.
            // This is a CRITICAL security check.
            var playlist = await _context.Playlists
                .FirstOrDefaultAsync(p => p.PlaylistId == playlistId && p.UserId == userId);

            // 3. If no such playlist exists (or it belongs to someone else), return NotFound.
            if (playlist == null)
            {
                return NotFound(new { Message = "Playlist not found or you do not have permission to delete it." });
            }

            // 4. If the playlist is found and belongs to the user, remove it.
            // Entity Framework Core is smart enough to also delete the related entries
            // in the PlaylistSong table (this is called a cascading delete).
            _context.Playlists.Remove(playlist);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Playlist deleted successfully." });
        }
    }
}
