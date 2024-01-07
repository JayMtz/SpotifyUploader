export declare class SpotifyWebApiService {
    getSpotifyId(authToken: any): Promise<any>;
    createPlaylist(authToken: any, spotifyId: any): Promise<{
        message: string;
        status: string;
        spotifyPlaylistUri: any;
        playlistName: any;
        url: any;
        spotifyPlaylistId: any;
    } | {
        message: string;
        status: string;
        spotifyPlaylistUri?: undefined;
        playlistName?: undefined;
        url?: undefined;
        spotifyPlaylistId?: undefined;
    }>;
    getSongUris(authToken: any, songs: any): Promise<any[]>;
    getUserPlaylistId(authToken: any, spotifyId: any): Promise<any>;
    uploadSongsToPlaylist(authToken: any, playlistId: any, songUris: any): Promise<any>;
}
