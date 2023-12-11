"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const promise_1 = require("mysql2/promise");
let UsersService = class UsersService {
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
    async createUser(id) {
        const connection = await this.pool.getConnection();
        const [result] = await connection.query(`INSERT INTO users (email, spotifyId) VALUES (?, NULL)`, [id]);
        connection.release();
        return { message: "created user from User service with the username of " + id };
    }
    async addSpotifyIdToUser(spotifyId, email) {
        const connect = await this.pool.getConnection();
        const query = 'UPDATE users SET spotifyId = ? WHERE email = ?';
        const [result] = await connect.query(query, [spotifyId, email]);
        connect.release();
        return [result];
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map