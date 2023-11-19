import { serverManager, accountManager } from '../managers';
import { logger } from '../helpers/logger';
import { Get, Post } from '../helpers/endpoint';

export const SpotifyController = (): void => {
  /**
   * @api {get} /spotify/login
   * @apiName SpotifyLogin
   * @apiGroup Spotify
   * @apiVersion 1.0.0
   */
  serverManager.v1.get('/spotify/login', (req, res) => {
    res.redirect(
      serverManager.spotifyApi.createAuthorizeURL(
        [
          'user-read-private',
          'user-read-email',
          'user-read-playback-state',
          'user-modify-playback-state',
          'user-read-currently-playing',
          'user-read-recently-played',
          'user-top-read',
          'streaming',
        ],
        'state',
      ),
    );
  });

  /**
   * @api {get} /spotify/callback
   * @apiName SpotifyCallback
   * @apiGroup Spotify
   * @apiVersion 1.0.0
   */
  serverManager.v1.get('/spotify/callback', (req, res) => {
    const code = req.query.code as string;
    serverManager.spotifyApi.authorizationCodeGrant(code).then(
      (data) => {
        logger.debug('[Spotify Callback] token found');

        serverManager.spotifyApi.setAccessToken(data.body.access_token);
        serverManager.spotifyApi.setRefreshToken(data.body.refresh_token);

        res.redirect('/app');
      },
      (err) => {
        logger.debug('[Spotify Callback] token not found');
        logger.error(err);
        res.redirect('/');
      },
    );
  });

  /**
   * @api {get} /spotify/test
   * @apiName SpotifyTest
   * @apiGroup Spotify
   * @apiVersion 1.0.0
   */
  Get(
    serverManager.v1,
    '/spotify/test',
    async (req) => {
      const song = serverManager.spotifyApi.getMe();
      if (song) {
        return {
          data: song,
        };
      }

      return {
        data: null,
      };
    },
    true,
  );

  logger.loadedController('auth');
};
