export declare class SpotifyWebApiService {
    getSpotifyId(authToken: any): Promise<any>;
    createPlaylist(authToken: any, spotifyId: any): Promise<any>;
    getSongUris(authToken: any, songs: any): Promise<any[]>;
    getUserPlaylistId(authToken: any, spotifyId: any): Promise<any>;
    uploadSongsToPlaylist(authToken: any, playlistId: any, songUris: any): Promise<any>;
}
