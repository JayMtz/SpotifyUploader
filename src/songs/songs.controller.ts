import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('Songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {}

    @Post('addSongs/:email')
    async addSongData( @Param('email') email: string, @Body() songs: any[]): Promise <any>{
        const spotifyId = await this.songsService.getSpotifyId(email);
        return this.songsService.addSongs(email, spotifyId, songs);
    }


    // @Delete('deleteSongs/:id')
    // async deleteSongs(@Param('id') id: string): Promise <any>{
    //     const spotifyId = await this.songsService.getSpotifyId(id)
    //     return this.songsService.deleteSongs(spotifyId);
    // }

    @Get('getSongs/:id')
    async getAppleSongs(@Param('id') id: string): Promise <any>{
        const spotifyId = await this.songsService.getSpotifyId(id);
        return this.songsService.getSongs(spotifyId);

    }
}


