# Description

### This is Built using NestJS
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

The intended use of this program is to take a list of songs and upload them onto a Users Spotify account.
- How it performs this
  - Takes in a list of JSON objects that is a list of songs to be uploaded and stores them in a SQL database
  - creates a custome User Spotify playlist
  - takes the uploaded list of songs and uploads them to the newly created playlist

### The following endpoints to perform User actions
   - Create a new user
     > @POST
     ```
        http://localhost:3000/users/createuser/USER_EMAIL
     ```


  - Add a Spotify Id to a user
    > @PUT
    ```
        http://localhost:3000/users/USER_EMAIL/addSpotifyId
    ```
    > accepts the following JSON object (must be valid Spotfy Auth token)
    ```
        {
            "token": "1234459"
        }
     ```

-  Add Song(s) to a user
   >@POST
   ```
        http://localhost:3000/Songs/addSongs/USER_EMAIL
   ```
   >accepts a array of JSON Objects 
   ```
   [
    {
      "SongName": "The Middle",
      "SongArtist": "Jimmy Eat World"
    },
    {
    "SongName": "Ohio Is for Lovers",
    "SongArtist": "Hawthorne Heights"
    }
   ]
   ```

 - Create a Spotify Playlist for a user
      >@Post
      ```
      http://localhost:3000/users/USER_EMAIL/createSpotifyPlaylist
      ```
      >accepts the following JSON object (must be valid Spotfy Auth token)
      ```
        {
            "token": "1234459"
        }
      ```

- Upload Songs to a Users new Playlist
  >@Post
  ```
     http://localhost:3000/users/USER_EMAIL/uploadSongsToSpotify
  ```
  >accepts the following JSON object (must be valid Spotfy Auth token)
   ```
        {
            "token": "1234459"
        }
   ```

        
    
This is intended to be used with the following SQL Scehma 

- Songs Table
  ```
  CREATE TABLE
  `UserSongs` (
    `SpotifyId` varchar(255) NOT NULL,
    `SongName` varchar(255) NOT NULL,
    `SongArtist` varchar(255) NOT NULL,
    UNIQUE KEY `unique_Song` (`SongName`, `SongArtist`)
  ) 
  ```


- Users Table
  ```
  CREATE TABLE
  `users` (
    `email` varchar(255) DEFAULT NULL,
    `spotifyId` varchar(255) DEFAULT NULL
  ) 
  ```
