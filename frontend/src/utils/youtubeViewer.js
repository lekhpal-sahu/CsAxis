export function getYoutubeThumbnail(url) {
  if (!url) return null;
  // Regex to extract video ID from various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    const videoId = match[2];
    // return high quality thumbnail
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return null;
}

export async function fetchPlaylistThumbnail(url) {
  if (!url || !url.includes('playlist?list=')) return null;
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(oembedUrl)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    if (data && data.contents) {
      const oembedData = JSON.parse(data.contents);
      return oembedData.thumbnail_url || null;
    }
  } catch (error) {
    console.error('Failed to fetch playlist thumbnail:', error);
  }
  return null;
}
