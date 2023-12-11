import { Injectable } from '@nestjs/common';
import { createPool } from 'mysql2/promise';

@Injectable()
export class SongsService {
  private pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1194',
    database: 'SpotifyUploader',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306, // Add port number for MySQL
  });

  async getSpotifyId(email) {
    const connect = await this.pool.getConnection();
    const query = 'SELECT spotifyId FROM users WHERE email = ?';
    const [result] = await connect.query(query, email);
    connect.release();
    return result[0].spotifyId;
  }


  async addSongs(spotifyId, songs: { SongName: string; SongArtist: string }[]): Promise<any> {
    const connect = await this.pool.getConnection();
    const results = [];
    for (const song of songs) {
      const { SongName, SongArtist } = song;
      try {
        const query = 'INSERT INTO UserSongs (SpotifyId, SongName, SongArtist) VALUES (?, ?, ?)';
        console.log(`...adding ${SongArtist} - ${SongName} to database..`);
        console.log(spotifyId)
        const [result] = await connect.query(query, [spotifyId, SongName,SongArtist]);
        results.push(result);
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.error('Duplicate entry:', song);
        } else {
          console.error('Error:', error.message);
        }
      }
    }
    connect.release();
    return results;
  }

  async deleteSongs(spotifyId){
    const connect = await this.pool.getConnection();
    const query = 'DELETE FROM appleMusicSongs WHERE appleMusicId = ?';
    const [result] = await connect.query(query, spotifyId);
    connect.release();
    return result;
  }

  async getSongs(spotifyId){
    const connect = await this.pool.getConnection();
    const query = 'SELECT SongName, SongArtist FROM UserSongs WHERE SpotifyId = ?'
    const [result] = await connect.query(query, spotifyId);
    connect.release();
    return result;
  }


}
