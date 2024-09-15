import { SongsService } from '../songs/songs.service';
export declare class SpotifyWebApiService {
    private readonly songsService;
    private readonly logger;
    constructor(songsService: SongsService);
    private getTimestamp;
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
    getSongUris(email: any, authToken: any, songs: any, playlistId: any): Promise<{
        error: any;
        status: boolean;
        result?: undefined;
    } | {
        result: any[];
        status: boolean;
        error?: undefined;
    }>;
    getUserPlaylistId(authToken: any, spotifyId: any): Promise<{
        playlistId: any;
        status: boolean;
        error?: undefined;
    } | {
        error: any;
        status: boolean;
        playlistId?: undefined;
    }>;
    uploadSongsToPlaylist(authToken: any, playlistId: any, songUris: any, spotifyId: any): Promise<{
        error: any;
        status: boolean;
        message?: undefined;
        snapshot_id?: undefined;
    } | {
        message: string;
        snapshot_id: any;
        status: boolean;
        error?: undefined;
    }>;
    removeSongsFromPlaylist(authToken: string, playlistId: string, songUris: string[], spotifyId: string): Promise<any>;
    removeSongFromPlaylist(authToken: string, email: string, song: string): Promise<any>;
}
