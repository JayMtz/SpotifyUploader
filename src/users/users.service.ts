require('dotenv').config();
import { env } from 'node:process';
import { Injectable } from '@nestjs/common';
import { createPool } from 'mysql2/promise';

const DATABASE_PASSWORD = env.DATABASE_PASSWORD;
const DATABASE_USER = env.DATABASE_USER;
const DATABASE_HOST = env.DATABASE_HOST;
const DATABASE_NAME = env.DATABASE_NAME;

@Injectable()
export class UsersService {
  private pool = createPool({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306, // Add port number for MySQL
  });

  async createUser(email): Promise<any> {
  try {
    const connection = await this.pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO users (email, spotifyId) VALUES (?, NULL)`,
      [email],
    );
    connection.release();
    console.log(`New User Created: ${email}`);
    return {
      message: 'User created successfully',
      status: true,
      user: {
        user: email,
        spotifyId: null,
      },
    };
  } catch (error) {
    console.log(`Failed to create new user: ${email} Error: ${error.message}`);
    return {
      message: `${error.message}, failed to create user ${email}`,
      status: false,
      sqlErrNum: error.errno,
    };
  }
}


  async addSpotifyIdToUser(spotifyId, email): Promise<any> {
    try{
    if(!spotifyId.status){
      console.log(`failed to add a spotify ID to ${email}: ${spotifyId.message}`)
      return {message: spotifyId.message,
              status: false}
    }
    const connect = await this.pool.getConnection();
    const query = 'UPDATE users SET spotifyId = ? WHERE email = ?'
    const [result] = await connect.query(query, [spotifyId.spotifyId, email]);
    connect.release(); // Release the database connection
    console.log(`Added Spotify ID ${spotifyId.spotifyId} to User ${email}`)
    return {
      message: `Added Spotify ID ${spotifyId.spotifyId} to User: ${email}`,
      status: true,
      user: {
        user: email,
        spotifyId: spotifyId.spotifyId,
      },
    };
  }
  catch (error){
    console.log(`${error.message}, Failed to add Spotify ID to User ${email}`)
    return {
      message: `${error.message}, Failed to add Spotify ID to User ${email}`,
      status: false,
      sqlErrNum: error.errno

    }
  }
  }
}
// UPDATE users SET spotifyId = ? WHERE email = ? AND email IS NOT NULL AND email != '';
