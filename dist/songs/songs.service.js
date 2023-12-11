"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const promise_1 = require("mysql2/promise");
let SongsService = class SongsService {
    constructor() {
        this.pool = (0, promise_1.createPool)({
            host: 'localhost',
            user: 'root',
            password: '1194',
            database: 'SpotifyUploader',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            port: 3306,
        });
    }
    async getSpotifyId(email) {
        const connect = await this.pool.getConnection();
        const query = 'SELECT spotifyId FROM users WHERE email = ?';
        const [result] = await connect.query(query, email);
        connect.release();
        return result[0].spotifyId;
    }
    async addSongs(spotifyId, songs) {
        const connect = await this.pool.getConnection();
        const results = [];
        for (const song of songs) {
            const { SongName, SongArtist } = song;
            try {
                const query = 'INSERT INTO UserSongs (SpotifyId, SongName, SongArtist) VALUES (?, ?, ?)';
                console.log(`...adding ${SongArtist} - ${SongName} to database..`);
                console.log(spotifyId);
                const [result] = await connect.query(query, [spotifyId, SongName, SongArtist]);
                results.push(result);
            }
            catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    console.error('Duplicate entry:', song);
                }
                else {
                    console.error('Error:', error.message);
                }
            }
        }
        connect.release();
        return results;
    }
    async deleteSongs(spotifyId) {
        const connect = await this.pool.getConnection();
        const query = 'DELETE FROM appleMusicSongs WHERE appleMusicId = ?';
        const [result] = await connect.query(query, spotifyId);
        connect.release();
        return result;
    }
    async getSongs(spotifyId) {
        const connect = await this.pool.getConnection();
        const query = 'SELECT SongName, SongArtist FROM UserSongs WHERE SpotifyId = ?';
        const [result] = await connect.query(query, spotifyId);
        connect.release();
        return result;
    }
};
SongsService = __decorate([
    (0, common_1.Injectable)()
], SongsService);
exports.SongsService = SongsService;
//# sourceMappingURL=songs.service.js.map