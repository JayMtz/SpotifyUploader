import { SongsService } from './songs.service';
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    addSongData(email: string, songs: any[]): Promise<any>;
    getAppleSongs(id: string): Promise<any>;
}
