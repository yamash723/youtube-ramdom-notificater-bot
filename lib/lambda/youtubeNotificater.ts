
import { notificationToLine } from "../domains/line"
import { getYoutubePlaylist } from "../domains/youtube"

export const handler = async (event: any = {}): Promise<any> => {
  const youtubeApiKey = process.env.YOUTUBE_API_KEY
  const youtubePlaylistId = process.env.YOUTUBE_PLAYLIST_ID
  const lineApiKey = process.env.LINE_API_KEY

  if (!youtubeApiKey || !youtubePlaylistId || !lineApiKey) throw new Error("Env error")

  try {
    const items = await getYoutubePlaylist(youtubeApiKey, youtubePlaylistId)
    if (!items) throw new Error("Playlist is empty")

    const num = Math.floor(Math.random() * items.length)
    const videoId = items[num].videoId
    const notificationMessage = `https://www.youtube.com/watch?v=${videoId}`

    await notificationToLine(lineApiKey, notificationMessage)

    return { statusCode: 200 }
  } catch (e) {
    throw new Error(e)
  }
}

