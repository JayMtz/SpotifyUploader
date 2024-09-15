export declare class SongsService {
    private pool;
    private getTimestamp;
    getSpotifyId(email: any): Promise<any>;
    addSongs(email: any, spotifyId: any, songs: {
        SongName: string;
        SongArtist: string;
    }[]): Promise<any>;
    getSongs(spotifyId: any): Promise<import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | [...import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[], import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader] | [...import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][], import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader]>;
}
