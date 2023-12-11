import { UsersService } from './users.service';
import { SpotifyWebApiService } from 'src/spotify-web-api/spotify-web-api.service';
import { SongsService } from 'src/songs/songs.service';
export declare class UsersController {
    private readonly userService;
    private readonly spotifyWebApi;
    private readonly SongsService;
    constructor(userService: UsersService, spotifyWebApi: SpotifyWebApiService, SongsService: SongsService);
    createUser(email: string): Promise<any>;
    createSpotifyPlaylist(spotifyAuthToken: any, email: string): Promise<any>;
    uploadSongsToSpotify(spotifyAuthToken: any, email: string): Promise<any>;
    addSpotifyIdtoUser(spotifyAuthToken: any, email: string): Promise<any>;
    getAllUsers(): Promise<any>;
    deleteAllUsers(email: string): Promise<any>;
}
