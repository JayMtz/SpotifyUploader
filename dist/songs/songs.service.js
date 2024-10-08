"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsService = void 0;
require('dotenv').config();
const node_process_1 = require("node:process");
const common_1 = require("@nestjs/common");
const promise_1 = require("mysql2/promise");
const moment = require("moment-timezone");
const DATABASE_PASSWORD = node_process_1.env.DATABASE_PASSWORD;
const DATABASE_USER = node_process_1.env.DATABASE_USER;
const DATABASE_HOST = node_process_1.env.DATABASE_HOST;
const DATABASE_NAME = node_process_1.env.DATABASE_NAME;
let SongsService = class SongsService {
    constructor() {
        this.pool = (0, promise_1.createPool)({
            host: DATABASE_HOST,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            port: 3306,
        });
    }
    getTimestamp() {
        return moment().tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss');
    }
    async getSpotifyId(email) {
        try {
            const connect = await this.pool.getConnection();
            const query = 'SELECT spotifyId FROM users WHERE email = ?';
            const [result] = await connect.query(query, email);
            connect.release();
            return result[0].spotifyId;
        }
        catch (error) {
            return error;
        }
    }
    async addSongs(email, spotifyId, songs) {
        const connect = await this.pool.getConnection();
        const results = [];
        let counter = 0;
        const timestamp = this.getTimestamp();
        for (const song of songs) {
            const { SongName, SongArtist } = song;
            try {
                const query = 'INSERT INTO UserSongs (SpotifyId, SongName, SongArtist) VALUES (?, ?, ?)';
                const [result] = await connect.query(query, [spotifyId, SongName, SongArtist]);
                results.push({
                    user: email,
                    spotifyId: spotifyId,
                    songArtist: SongArtist,
                    songName: SongName,
                    status: true
                });
                counter++;
            }
            catch (error) {
                results.push({
                    error: error.message,
                    user: email,
                    spotifyId: spotifyId,
                    songArtist: SongArtist,
                    songName: SongName,
                    status: false
                });
            }
        }
        console.log(`[${timestamp}] Added ${counter}/${results.length} songs to User: ${email}`);
        connect.release();
        return results;
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