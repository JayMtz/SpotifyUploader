export declare class UsersService {
    private pool;
    createUser(id: any): Promise<any>;
    addSpotifyIdToUser(spotifyId: any, email: any): Promise<any>;
    addAppleMusicIdToUser(appleMusicId: any, id: any): Promise<any>;
    returnAllUsers(): Promise<any>;
    deleteUser(id: any): Promise<any>;
}
