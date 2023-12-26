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
exports.SongsController = void 0;
const common_1 = require("@nestjs/common");
const songs_service_1 = require("./songs.service");
let SongsController = class SongsController {
    constructor(songsService) {
        this.songsService = songsService;
    }
    async addSongData(email, songs) {
        const spotifyId = await this.songsService.getSpotifyId(email);
        return this.songsService.addSongs(email, spotifyId, songs);
    }
    async deleteSongs(id) {
        const spotifyId = await this.songsService.getSpotifyId(id);
        return this.songsService.deleteSongs(spotifyId);
    }
    async getAppleSongs(id) {
        const spotifyId = await this.songsService.getSpotifyId(id);
        return this.songsService.getSongs(spotifyId);
    }
};
__decorate([
    (0, common_1.Post)('addSongs/:email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "addSongData", null);
__decorate([
    (0, common_1.Delete)('deleteSongs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "deleteSongs", null);
__decorate([
    (0, common_1.Get)('getSongs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "getAppleSongs", null);
SongsController = __decorate([
    (0, common_1.Controller)('Songs'),
    __metadata("design:paramtypes", [songs_service_1.SongsService])
], SongsController);
exports.SongsController = SongsController;
//# sourceMappingURL=songs.controller.js.map