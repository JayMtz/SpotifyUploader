"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyWebApiService = void 0;
const common_1 = require("@nestjs/common");
const node_fetch_1 = require("node-fetch");
let SpotifyWebApiService = class SpotifyWebApiService {
    async getSpotifyId(authToken) {
        try {
            const response = await (0, node_fetch_1.default)('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                const errorTxt = await response.json();
                throw new Error(`${errorTxt.error.message}`);
            }
            const data = await response.json();
            console.log(`Connection to Spotify API made to obtain Spotify ID ${data.id} `);
            return data.id;
        }
        catch (error) {
            return error.message;
        }
    }
    async createPlaylist(authToken, spotifyId) {
        const playlistName = 'Your Custom Playlist';
        const playlistDescription = 'Your Custom Description';
        try {
            const response = await (0, node_fetch_1.default)(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
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
            return response.json();
        }
        catch (error) {
            console.log(error);
            return { message: `ERROR: ${error}` };
        }
    }
    async getSongUris(authToken, songs) {
        console.log(`Gathering Spotify Song Uris from Users Apple Music Songs`);
        const result = [];
        const batchSize = 5;
        for (let i = 0; i < songs.length; i += batchSize) {
            const batch = songs.slice(i, i + batchSize);
            const requests = batch.map(async (song) => {
                const searchQuery = encodeURIComponent(`${song.SongName} ${song.SongArtist}`);
                const response = await (0, node_fetch_1.default)(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.tracks.items.length > 0) {
                        console.log(`${data.tracks.items[0].uri} : ${song.SongArtist} - ${song.SongName}`);
                        return data.tracks.items[0].uri;
                    }
                    else {
                        throw new Error(`No matching track found for ${song.SongName} by ${song.SongArtist}`);
                    }
                }
                else {
                    throw new Error('Failed to fetch data from Spotify API.');
                }
            });
            try {
                const batchResult = await Promise.all(requests);
                result.push(...batchResult);
            }
            catch (error) {
                throw new Error(`An error occurred: ${error.message}`);
            }
        }
        return result;
    }
    async getUserPlaylistId(authToken, spotifyId) {
        const response = await (0, node_fetch_1.default)(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        const playlistName = 'Your Custom Playlist';
        const playlistId = data.items.find(item => item.name === playlistName);
        return playlistId.id;
    }
    async uploadSongsToPlaylist(authToken, playlistId, songUris) {
        console.log(`Now uploading songs..`);
        const response = await (0, node_fetch_1.default)(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uris: songUris }),
        });
        const data = await response.json();
        return data;
    }
};
SpotifyWebApiService = __decorate([
    (0, common_1.Injectable)()
], SpotifyWebApiService);
exports.SpotifyWebApiService = SpotifyWebApiService;
//# sourceMappingURL=spotify-web-api.service.js.map