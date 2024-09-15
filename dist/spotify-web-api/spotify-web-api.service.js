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
var SpotifyWebApiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyWebApiService = void 0;
const common_1 = require("@nestjs/common");
const songs_service_1 = require("../songs/songs.service");
const moment = require("moment-timezone");
let SpotifyWebApiService = SpotifyWebApiService_1 = class SpotifyWebApiService {
    constructor(songsService) {
        this.songsService = songsService;
        this.logger = new common_1.Logger(SpotifyWebApiService_1.name);
    }
    getTimestamp() {
        return moment().tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss');
    }
    async getSpotifyId(authToken) {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(`${data.error.message}`);
            }
            const data = await response.json();
            return { status: true,
                spotifyId: data.id };
        }
        catch (error) {
            return { message: error.message,
                status: false };
        }
    }
    async createPlaylist(authToken, spotifyId) {
        const playlistName = 'Your Custom Playlist';
        const playlistDescription = 'Your Custom Description';
        const timestamp = this.getTimestamp();
        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: playlistName,
                    description: playlistDescription,
                    public: true,
                }),
            });
            if (!response.ok) {
                const errorTxt = await response.json();
                throw new Error(`${errorTxt.error.message}`);
            }
            let data = await response.json();
            console.log(`[${timestamp}] Spotify playlist created for spotifyId: ${spotifyId}`);
            return {
                message: `Playlist Created`,
                status: true,
                spotifyPlaylistUri: data.uri,
                playlistName: data.name,
                url: data.external_urls.spotify,
                spotifyPlaylistId: data.id,
            };
        }
        catch (error) {
            console.log(`Failed to create SpotifyPlaylist for ${spotifyId}: ${error}`);
            return {
                message: `ERROR: ${error}`,
                status: false
            };
        }
    }
    async getSongUris(email, authToken, songs, playlistId) {
        if (!playlistId.status) {
            return { error: playlistId.error,
                status: false };
        }
        const result = [];
        const batchSize = 5;
        for (let i = 0; i < songs.length; i += batchSize) {
            let counter = 0;
            const batch = songs.slice(i, i + batchSize);
            const requests = batch.map(async (song) => {
                const searchQuery = encodeURIComponent(`${song.SongName} ${song.SongArtist}`);
                const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    counter++;
                    if (data.tracks.items.length > 0) {
                        return data.tracks.items[0].uri;
                    }
                    else {
                        console.log('test??');
                        console.log(`fNo matching track found for ${song.SongName} by ${song.SongArtist}`);
                    }
                }
                else {
                    throw new Error(`data.error.message`);
                }
            });
            try {
                const batchResult = await Promise.all(requests);
                result.push(...batchResult);
            }
            catch (error) {
                console.log('HERE');
            }
        }
        return { result: result,
            status: true };
    }
    async getUserPlaylistId(authToken, spotifyId) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(`${data.error.message}`);
            }
            const data = await response.json();
            const playlistName = 'Your Custom Playlist';
            const playlistId = data.items.find(item => item.name === playlistName);
            return { playlistId: playlistId.id,
                status: true
            };
        }
        catch (error) {
            return { error: error.message,
                status: false
            };
        }
    }
    async uploadSongsToPlaylist(authToken, playlistId, songUris, spotifyId) {
        const timestamp = this.getTimestamp();
        if (!songUris.status) {
            console.log(`failed to upload songs to spotify for ${spotifyId}: ${songUris.error}`);
            return { error: songUris.error,
                status: false };
        }
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId.playlistId}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uris: songUris.result }),
        });
        const data = await response.json();
        console.log(`[${timestamp}] Songs uploaded onto spotify for user ${spotifyId}`);
        return { message: `Songs uploaded to spotify for SpotifyId: ${spotifyId}`,
            snapshot_id: data.snapshot_id,
            status: true
        };
    }
    async removeSongsFromPlaylist(authToken, playlistId, songUris, spotifyId) {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uris: songUris }),
        });
    }
    async removeSongFromPlaylist(authToken, email, song) {
        this.logger.log(`Attempting to remove song: ${song} for user: ${email}`);
        try {
            const spotifyId = await this.songsService.getSpotifyId(email);
            this.logger.log(`Retrieved Spotify ID: ${spotifyId}`);
            const playlistIdResult = await this.getUserPlaylistId(authToken, spotifyId);
            this.logger.log(`getUserPlaylistId result:`, playlistIdResult);
            const playlistId = playlistIdResult.playlistId;
            if (!playlistId) {
                this.logger.error('Failed to retrieve playlist ID');
                return { error: 'Playlist ID not found' };
            }
            this.logger.log(`Retrieving song URI for: ${song}`);
            const songUrisResult = await this.getSongUris(email, authToken, [song], playlistId);
            this.logger.log(`getSongUris result:`, songUrisResult);
            if (!songUrisResult || !songUrisResult.result) {
                this.logger.error('Failed to retrieve song URI');
                return { error: 'Song URI not found' };
            }
            const songUri = songUrisResult.result[0];
            this.logger.log(`Retrieved song URI: ${songUri}`);
            if (!songUri) {
                this.logger.error('Song URI is undefined');
                return { error: 'Song not found in playlist' };
            }
            const result = await this.removeSongsFromPlaylist(authToken, playlistId, [songUri], spotifyId);
            this.logger.log(`Removal result:`, result);
            return result;
        }
        catch (error) {
            this.logger.error('Error in removeSongFromPlaylist:', error);
            return { error: 'Failed to remove song', details: error.message };
        }
    }
};
SpotifyWebApiService = SpotifyWebApiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [songs_service_1.SongsService])
], SpotifyWebApiService);
exports.SpotifyWebApiService = SpotifyWebApiService;
//# sourceMappingURL=spotify-web-api.service.js.map