"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const spotify_web_api_service_1 = require("../spotify-web-api/spotify-web-api.service");
const songs_service_1 = require("../songs/songs.service");
let UsersController = class UsersController {
    constructor(userService, spotifyWebApi, SongsService) {
        this.userService = userService;
        this.spotifyWebApi = spotifyWebApi;
        this.SongsService = SongsService;
    }
    createUser(email) {
        return this.userService.createUser(email);
    }
    async createSpotifyPlaylist(spotifyAuthToken, email) {
        const authToken = spotifyAuthToken.token;
        const spotifyId = await this.SongsService.getSpotifyId(email);
        return this.spotifyWebApi.createPlaylist(authToken, spotifyId);
    }
    async uploadSongsToSpotify(spotifyAuthToken, email) {
        const authToken = spotifyAuthToken.token;
        const spotifyId = await this.SongsService.getSpotifyId(email);
        const songs = await this.SongsService.getSongs(spotifyId);
        const playlistId = await this.spotifyWebApi.getUserPlaylistId(authToken, spotifyId);
        const songUris = await this.spotifyWebApi.getSongUris(email, authToken, songs, playlistId);
        return await this.spotifyWebApi.uploadSongsToPlaylist(authToken, playlistId, songUris, spotifyId);
    }
    async addSpotifyIdtoUser(spotifyAuthToken, email) {
        const authToken = spotifyAuthToken.token;
        const spotifyId = await this.spotifyWebApi.getSpotifyId(authToken);
        return this.userService.addSpotifyIdToUser(spotifyId, email);
    }
};
__decorate([
    (0, common_1.Post)('createuser/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)(`:email/createSpotifyPlaylist`),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createSpotifyPlaylist", null);
__decorate([
    (0, common_1.Post)(`:email/uploadSongsToSpotify`),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadSongsToSpotify", null);
__decorate([
    (0, common_1.Put)(':email/addSpotifyId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addSpotifyIdtoUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        spotify_web_api_service_1.SpotifyWebApiService,
        songs_service_1.SongsService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map