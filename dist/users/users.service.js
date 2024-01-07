"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
require('dotenv').config();
const node_process_1 = require("node:process");
const common_1 = require("@nestjs/common");
const promise_1 = require("mysql2/promise");
const DATABASE_PASSWORD = node_process_1.env.DATABASE_PASSWORD;
const DATABASE_USER = node_process_1.env.DATABASE_USER;
const DATABASE_HOST = node_process_1.env.DATABASE_HOST;
const DATABASE_NAME = node_process_1.env.DATABASE_NAME;
let UsersService = class UsersService {
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
    async createUser(email) {
        try {
            const connection = await this.pool.getConnection();
            const [result] = await connection.query(`INSERT INTO users (email, spotifyId) VALUES (?, NULL)`, [email]);
            connection.release();
            console.log(`New User Created: ${email}`);
            return {
                message: 'User created successfully',
                user: {
                    user: email,
                    spotifyId: null,
                },
            };
        }
        catch (error) {
            console.log(`failed to create new user: ${email} Error: ${error.message}`);
            return error.message;
        }
    }
    async addSpotifyIdToUser(spotifyId, email) {
        try {
            if (!spotifyId.status) {
                console.log(`failed to add a spotify ID to ${email}: ${spotifyId.error}`);
                return { Error: spotifyId.error,
                    status: false };
            }
            const connect = await this.pool.getConnection();
            const query = 'UPDATE users SET spotifyId = ? WHERE email = ?';
            const [result] = await connect.query(query, [spotifyId.spotifyId, email]);
            connect.release();
            console.log(`Added Spotify ID ${spotifyId.spotifyId} to User ${email}`);
            return {
                message: `Added Spotify ID ${spotifyId.spotifyId} to User: ${email}`,
                status: true,
                user: {
                    user: email,
                    spotifyId: spotifyId.spotifyId,
                },
            };
        }
        catch (error) {
            console.log(`${error.message}, Failed to add Spotify ID to User ${email}`);
            return {
                message: `${error.message}, Failed to add Spotify ID to User ${email}`,
                status: false,
                errnum: error.errno
            };
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map