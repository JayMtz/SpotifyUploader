import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyWebApiService } from './spotify-web-api.service';

describe('SpotifyWebApiService', () => {
  let service: SpotifyWebApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyWebApiService],
    }).compile();

    service = module.get<SpotifyWebApiService>(SpotifyWebApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
