export declare class SpotifyWebApiService {
    getSpotifyId(authToken: any): Promise<{
        status: boolean;
        spotifyId: any;
        message?: undefined;
    } | {
        message: any;
        status: boolean;
        spotifyId?: undefined;
    }>;
    createPlaylist(authToken: any, spotifyId: any): Promise<{
        message: string;
        status: boolean;
        spotifyPlaylistUri: any;
        playlistName: any;
        url: any;
        spotifyPlaylistId: any;
    } | {
        message: string;
        status: boolean;
        spotifyPlaylistUri?: undefined;
        playlistName?: undefined;
        url?: undefined;
        spotifyPlaylistId?: undefined;
    }>;
    getSongUris(authToken: any, songs: any): Promise<any[]>;
    getUserPlaylistId(authToken: any, spotifyId: any): Promise<any>;
    uploadSongsToPlaylist(authToken: any, playlistId: any, songUris: any): Promise<number>;
}
