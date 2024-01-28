import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { SpotifyWebApiService } from 'src/spotify-web-api/spotify-web-api.service';
import { SongsService } from 'src/songs/songs.service';



@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService,
                private readonly spotifyWebApi: SpotifyWebApiService,
                private readonly SongsService: SongsService
                ) {}
                
    //User Accounts are tracked by a Email based ID

    @Post('createuser/:email')
    createUser(@Param('email') email: string) {
        return this.userService.createUser(email);
    }

    @Post (`:email/createSpotifyPlaylist`)
    async createSpotifyPlaylist( @Body() spotifyAuthToken: any, @Param('email') email: string ){
        const authToken = spotifyAuthToken.token; 
        const spotifyId = await this.SongsService.getSpotifyId(email)
        return this.spotifyWebApi.createPlaylist(authToken, spotifyId)

    }

   @Post(`:email/uploadSongsToSpotify`)
   //uploads songs to new spotify playlist for a user
    async uploadSongsToSpotify( @Body() spotifyAuthToken: any, @Param('email') email: string){
    const authToken = spotifyAuthToken.token
    const spotifyId = await this.SongsService.getSpotifyId(email)
    const songs = await this.SongsService.getSongs(spotifyId)
    const playlistId = await this.spotifyWebApi.getUserPlaylistId(authToken, spotifyId)
    const songUris = await this.spotifyWebApi.getSongUris(email,authToken, songs, playlistId)
   return await this.spotifyWebApi.uploadSongsToPlaylist(authToken, playlistId, songUris,spotifyId);
   
   }


    
    @Put(':email/addSpotifyId')
    async addSpotifyIdtoUser(@Body() spotifyAuthToken: any, @Param('email') email: string){
        const authToken = spotifyAuthToken.token
        const spotifyId = await this.spotifyWebApi.getSpotifyId(authToken)
        return this.userService.addSpotifyIdToUser(spotifyId, email)
    }

    
}
