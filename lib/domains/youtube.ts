import { google } from "googleapis"

export interface YoutubePlaylistItem {
    videoId: string
}

export const getYoutubePlaylist = async (apiKey: string, playlistId: string): Promise<YoutubePlaylistItem[]> => {
    const service = google.youtube("v3")
    const playlistResponse = await service.playlistItems.list({
        auth: apiKey,
        playlistId: playlistId,
        part: ["contentDetails"],
        maxResults: 50,
    })

    const playlistItems = playlistResponse?.data.items
    if (!playlistItems) return []

    return playlistItems
        .map((item) => { return { videoId: item.contentDetails?.videoId } })
        .filter((item): item is YoutubePlaylistItem => item.videoId != null)
}
