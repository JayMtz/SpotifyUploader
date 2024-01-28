import { UsersService } from './users.service';
import { SpotifyWebApiService } from 'src/spotify-web-api/spotify-web-api.service';
import { SongsService } from 'src/songs/songs.service';
export declare class UsersController {
    private readonly userService;
    private readonly spotifyWebApi;
    private readonly SongsService;
    constructor(userService: UsersService, spotifyWebApi: SpotifyWebApiService, SongsService: SongsService);
    createUser(email: string): Promise<any>;
    createSpotifyPlaylist(spotifyAuthToken: any, email: string): Promise<{
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
    uploadSongsToSpotify(spotifyAuthToken: any, email: string): Promise<{
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
    addSpotifyIdtoUser(spotifyAuthToken: any, email: string): Promise<any>;
}
