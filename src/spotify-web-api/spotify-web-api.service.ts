import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class SpotifyWebApiService {

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
            console.log(`Connection to Spotify API made to obtain Spotify ID ${data.id} `);
            return {status: true,
                    spotifyId: data.id};
        } catch (error) {
            return {message: error.message,
                    status: false}
        }
    }

    async createPlaylist(authToken, spotifyId) {
        const playlistName = 'Your Custom Playlist';
        const playlistDescription = 'Your Custom Description';

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
            console.log(`Spotify playlist created for spotifyId: ${spotifyId}`);
            
            return {
                message: `Playlist Created`,
                status: true,
                spotifyPlaylistUri: data.uri,
                playlistName: data.name,
                url: data.external_urls.spotify,
                spotifyPlaylistId: data.id,
            };
        } catch (error) {
            console.log(`Failed to create SpotifyPlaylist for ${spotifyId}: ${error}`);
            return {
                message: `ERROR: ${error}`,
                status: false
            };
        }
    }

    async getSongUris(email, authToken, songs, playlistId) {
        if(!playlistId.status){
            return {error: playlistId.error,
                status: false}
        }
        const result = [];
        const batchSize = 5;

        for (let i = 0; i < songs.length; i += batchSize) {
            let counter = 0
            const batch = songs.slice(i, i + batchSize);
            const requests = batch.map(async (song) => {
                const searchQuery = encodeURIComponent(`${song.SongName} ${song.SongArtist}`);
                const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
               // const data = await response.json();
                //console.log(` ${counter} Connection to Spotify API made: ${data.tracks.items[0].uri} : ${song.SongArtist} - ${song.SongName} for user: ${email}`);

                if (response.ok) {
                    
                    const data = await response.json();
                    //console.log(` ${counter} Connection to Spotify API made: ${data.tracks.items[0].uri} : ${song.SongArtist} - ${song.SongName} for user: ${email}`);
                    counter++
                    if (data.tracks.items.length > 0) {
                        
                        return data.tracks.items[0].uri;
                    } else {
                        console.log('test??')
                        //throw new Error(`No matching track found for ${song.SongName} by ${song.SongArtist}`);
                        console.log(`fNo matching track found for ${song.SongName} by ${song.SongArtist}`)
                    }
                    
                } else {
                    throw new Error(`data.error.message`);
                     
                }
                
            });

            try {
                const batchResult = await Promise.all(requests);
                result.push(...batchResult);
            } catch (error) {
                console.log('HERE')
                // return {error: error.message,
                //         status: false}
            }
        }
        //console.log(result)
        return {result: result,
            status: true}
    }

    async getUserPlaylistId(authToken, spotifyId) {
        try{
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
        return {playlistId: playlistId.id,
                status: true
            }
    }
    catch (error){
        return {error: error.message,
            status: false
    }
    }
}

    async uploadSongsToPlaylist(authToken, playlistId, songUris, spotifyId) {
        if(!songUris.status){
            console.log(`failed to upload songs to spotify for ${spotifyId}: ${songUris.error}`)
            return {error: songUris.error,
                    status: false}
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
        console.log(`Songs uploaded onto spotify for user ${spotifyId}`)
        return {   message: `Songs uploaded to spotify for SpotifyId: ${spotifyId}`,
            snapshot_id: data.snapshot_id,
            status: true
        }
    }
}
