import { Injectable } from '@nestjs/common';
import { error } from 'console';
import { json, response } from 'express';
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
                throw new Error('Error reaching Spotify Web API');
            }

            const data = await response.json();
            console.log('Response from Spotify:');
            console.log(data);
            console.log(`Your Spotify id is ${data.id}`);
            return data.id;
        } catch (error) {
            throw new Error('Error fetching data from Spotify API (most likely bad auth token)');
        }
    }

    async createPlaylist(authToken, spotifyId) {
        const playlistName = 'Your Custom Playlist';
        const playlistDescription = 'Your Custom Description';
        console.log(authToken)
        console.log(spotifyId)

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
                const errorText = await response.text();
                throw new Error(`Failed to create playlist. Status: ${response.status}, Message: ${errorText}`);
            
                
            }

            const playlistData = await response.json();
            return playlistData;
        } catch (error) {
            console.log(error)
            //console.log(response.json())
            throw error;
        }
    }

    async getSongUris(authToken, songs) {
        console.log(`Gathering Spotify Song Uris from Users Apple Music Songs`)
        const result = [];
        const batchSize = 5;
        // Loop through the songs in batches
        for (let i = 0; i < songs.length; i += batchSize) {
            // Slice the songs into a batch of the specified size
            const batch = songs.slice(i, i + batchSize);
            // Create an array of asynchronous requests for each song in the batch
            const requests = batch.map(async (song) => {
                // Construct the search query based on song name and artist
                
                const searchQuery = encodeURIComponent(`${song.SongName} ${song.SongArtist}`);
                
                // Make a request to the Spotify API
                const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    },
                });
    
                // Process the API response
                if (response.ok) {
                    const data = await response.json();
                    if (data.tracks.items.length > 0) {
                        console.log(`${data.tracks.items[0].uri} : ${song.SongArtist} - ${song.SongName}`)

                        return data.tracks.items[0].uri; // Return the URI of the first matching track
                    } else {
                        throw new Error(`No matching track found for ${song.SongName} by ${song.SongArtist}`);
                    }
                } else {
                    throw new Error('Failed to fetch data from Spotify API.');
                }
                
            });
            try {
                // Wait for all requests in the batch to complete
                const batchResult = await Promise.all(requests);
    
                // Add the batch results to the final result array
               
                result.push(...batchResult);
                
            } catch (error) {
                throw new Error(`An error occurred: ${error.message}`);
            }
        }
    
        // Return the aggregated result
        return result;
    }
    
    async getUserPlaylistId(authToken, spotifyId){
        //console.log(authToken)
        const response = await fetch(`https://api.spotify.com/v1/users/${spotifyId}/playlists`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                })

        const data = await response.json()
        

    const playlistName = 'Your Custom Playlist'
       const playlistId =  data.items.find(item => item.name === playlistName);
        return playlistId.id
       
    }

    async uploadSongsToPlaylist(authToken, playlistId, songUris){
        console.log(`Now uploading songs..`)
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({uris: songUris})
        })
        const data = await response.json();
        return data;
    }
    

    

   
}


