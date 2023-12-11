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

# Description

### This is Built using NestJS
### The following Controllers handle routings and are the main files to look at to view the end point functions
    -Users Controller
        src/users/users.controller.ts
    -Spotify Songs Controller
        src/spotify-songs/spotify-songs.controller.ts
    -Apple Music Songs Controller
        src/apple-music-songs/apple-music-songs.controller.ts


### END POINTS TO CREATE/DELTE USERS AND USERS ACCOUNT INFO & INTERACT WITH USER APP SERVICES
     //Call to create a new user
        POST
        http://localhost:3000/users/createuser/NEW_USER_EMAIL

    //Add a Spotify Id to a user
        PUT
        http://localhost:3000/users/USER_EMAIL/addSpotifyId
        (accepts the following JSON object)
        (must be valid Spotfy Auth token)
        {
            "token": "1234459"
        }
        
    //Create a Spotify Playlist for a user
     @Post
     http://localhost:3000/users/USER_EMAIL/createSpotifyPlaylist
     (accepts the following JSON object)
        (must be valid Spotfy Auth token)
        {
            "token": "1234459"
        }


    //Add a Apple Music Id to a user 
        PUT
        http://localhost:3000/users/USER_EMAIL/addAppleMusicId/APPLE_MUSIC_ID

    //Return all users
        GET
        http://localhost:3000/users/returnAllUsers
        (returns a Arry of JSON objects) ex:
            [
                {
                    "email": "jxspell@hotmail.com",
                    "spotifyId": "jayerds",
                    "appleMusicId": null
                },
                {
                    "email": "thuy@gmail.com",
                    "spotifyId": "Thuuuy",
                    "appleMusicId": null
                }
            ]

    //Delete a user
        DELETE
        http://localhost:3000/users/USER_EMAIL

### END POINTS TO MANIPULATE USERS SPOTIFY SONGS DATA

    //Add Spotify Song(s) to a user
        POST
        http://localhost:3000/spotifySongs/addSpotifySongs/USER_EMAIL
        (accepts a array of JSON Objects) ex:
            [
                {
                    "spotifySongName": "The Middle",
                    "spotifySongArtist": "Jimmy Eat World"
                },
                {
                    "spotifySongName": "Ohio Is for Lovers",
                    "spotifySongArtist": "Hawthorne Heights"
                }
            ]

 
    //Delete all Spotify Songs for a User
        DELETE
        http://localhost:3000/spotifySongs/deleteSpotifySongs/USER_EMAIL

    //Get Spotify Songs for a User

        GET
        http://localhost:3000/spotifySongs/getSpotifySongs/USER_EMAIL
        (returns a arry of JSON object) ex
            [
                {
                    "spotifySongName": "Ohio Is for Lovers",
                    "spotifySongArtist": "Hawthorne Heights"
                },
                {
                    "spotifySongName": "The Middle",
                    "spotifySongArtist": "Jimmy Eat World"
                }
            ]


### END POINTS TO MANIPULATE USERS APPLE SONGS DATA
    //Add Apple Music Song(s) for a User
        @POST
        http://localhost:3000/appleMusicSongs/addAppleSongs/USER_EMAIL
        (accepts array of JSON objects) ex:
            [
                {
                    "appleMusicSongName": "Ohio Is for Lovers",
                    "appleMusicSongArtist": "Hawthorne Heights"
                },
                {
                    "appleMusicSongName": "The Middle",
                    "appleMusicSongArtist": "Jimmy Eat World"
                }
            ]
    //Delete Apple Music Song(s) for a User
        @DELETE
        http://localhost:3000/appleMusicSongs/deleteAppleSongs/USER_EMAIL

    //Get Apple Music Song(s) for a User
        @Get
        http://localhost:3000/appleMusicSongs/getAppleSongs/USER_EMAIL
        (Returns a array of JSON objects) ex:
             [
                {
                    "appleMusicSongName": "Ohio Is for Lovers",
                    "appleMusicSongArtist": "Hawthorne Heights"
                },
                {
                    "appleMusicSongName": "The Middle",
                    "appleMusicSongArtist": "Jimmy Eat World"
                }
            ]









## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
