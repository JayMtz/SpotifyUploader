require('dotenv').config();
import { env } from 'node:process';
import { Injectable } from '@nestjs/common';
import {createPool } from 'mysql2/promise';

const DATABASE_PASSWORD = env.DATABASE_PASSWORD
const DATABASE_USER = env.DATABASE_USER
const DATABASE_HOST = env.DATABASE_HOST
const DATABASE_NAME = env.DATABASE_NAME

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

  async createUser(id): Promise<any> {
    const connection = await this.pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO users (email, spotifyId) VALUES (?, NULL)`,
      [id],
    );
    connection.release();
    return { message: "created user from User service with the username of " + id };
  }

  async addSpotifyIdToUser(spotifyId, email): Promise<any> {
    const connect = await this.pool.getConnection();
    const query = 'UPDATE users SET spotifyId = ? WHERE email = ?';
    const [result] = await connect.query(query, [spotifyId, email]);
    connect.release(); // Release the database connection
    return [result];
  }
  


  
  
}


