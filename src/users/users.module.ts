import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SpotifyWebApiService } from 'src/spotify-web-api/spotify-web-api.service';
import { SongsService } from 'src/songs/songs.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, SpotifyWebApiService, SongsService]
})
export class UsersModule {}
