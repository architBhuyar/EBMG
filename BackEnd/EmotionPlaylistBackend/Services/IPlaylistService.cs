using EmotionPlaylistBackend.Models;

namespace EmotionPlaylistBackend.Services
{
    public interface IPlaylistService
    {
        Task<ICollection<Song>> GeneratePlaylistForEmotionAsync(string emotion);
    }
}
