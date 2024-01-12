require('dotenv').config();
import { env } from 'node:process';
import { Injectable } from '@nestjs/common';
import { createPool } from 'mysql2/promise';
import { response } from 'express';
import { connect } from 'node:http2';

const DATABASE_PASSWORD = env.DATABASE_PASSWORD;
const DATABASE_USER = env.DATABASE_USER;
const DATABASE_HOST = env.DATABASE_HOST;
const DATABASE_NAME = env.DATABASE_NAME;

@Injectable()
export class SongsService {
  private pool = createPool({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306, 
  });

  async getSpotifyId(email) {
    try{
    const connect = await this.pool.getConnection();
    const query = 'SELECT spotifyId FROM users WHERE email = ?';
    const [result] = await connect.query(query, email);
    connect.release();
    return result[0].spotifyId;
    }
    
    catch(error){
      return error;
    }
  }

  async addSongs(email, spotifyId, songs: { SongName: string; SongArtist: string }[]): Promise<any> {
    const connect = await this.pool.getConnection();
    const results = [];

    for (const song of songs) {
      const { SongName, SongArtist } = song;

      try {
        const query = 'INSERT INTO UserSongs (SpotifyId, SongName, SongArtist) VALUES (?, ?, ?)';
        const [result] = await connect.query(query, [spotifyId, SongName, SongArtist]);
        console.log(`Adding ${SongArtist}-${SongName} to User: ${email}`);
        results.push({
          user: email,
          spotifyId: spotifyId,
          songArtist: SongArtist,
          songName: SongName,
          status: true
        });
      } catch (error) {
        console.log(`Failed to add ${SongArtist}-${SongName} to User ${email}`)
        results.push({
          error: error.message,
          user: email,
          spotifyId: spotifyId,
          songArtist: SongArtist,
          songName: SongName,
          status: false
        });
      }
    }

    connect.release();
    return results;
  }

  // async deleteSongs(spotifyId) {
  //   const connect = await this.pool.getConnection();
  //   const query = 'DELETE FROM appleMusicSongs WHERE appleMusicId = ?';
  //   const [result] = await connect.query(query, spotifyId);
  //   connect.release();
  //   return result;
  // }

  async getSongs(spotifyId) {
    const connect = await this.pool.getConnection();
    const query = 'SELECT SongName, SongArtist FROM UserSongs WHERE SpotifyId = ?';
    const [result] = await connect.query(query, spotifyId);
    connect.release();
    return result;
  }
}
