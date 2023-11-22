import { serverManager, accountManager, authManager } from '../managers';
import { logger } from '../helpers/logger';
import { Post } from '../helpers/artemis';

export const AuthController = (): void => {
  /**
   * @api {post} /auth/login
   * @apiName Login
   * @apiGroup Auth
   */
  Post(
    serverManager.v1,
    '/auth/login',
    async (req, res, body) => {
      const device = serverManager.getDeviceData(req);

      const scanLoginData = accountManager.scanLoginData(body);
      if (scanLoginData.error) {
        return {
          server: {
            success: false,
            error: scanLoginData.error,
          },
        };
      }

      const login = await accountManager.loginAccount(body, JSON.stringify(device));
      if (login.error || !login.account) {
        return {
          server: {
            success: false,
            error: login.error,
          },
        };
      }

      const cookie = authManager.sign(login.account);
      res.cookie('token', cookie, {
        httpOnly: true,
        secure: process.env.MODE === 'production',
        sameSite: 'lax',
        path: '/',
      });

      return {
        data: {
          account: login.account,
          token: cookie,
        },
      };
    },
    false,
    true,
  );

  /**
   * @api {post} /auth/create
   * @apiName Create
   * @apiGroup Auth
   */
  Post(
    serverManager.v1,
    '/auth/create',
    async (req, res, body) => {
      const device = serverManager.getDeviceData(req);

      const scanCreateData = accountManager.scanCreateData(body);
      if (scanCreateData.error) {
        return {
          server: {
            success: false,
            error: scanCreateData.error,
          },
        };
      }

      const create = await accountManager.createAccount(body, JSON.stringify(device));
      if (create.error || !create.account) {
        return {
          server: {
            success: false,
            error: create.error,
          },
        };
      }

      const cookie = authManager.sign(create.account);
      res.cookie('token', cookie, {
        httpOnly: true,
        secure: process.env.MODE === 'production',
        sameSite: 'lax',
        path: '/',
      });

      return {
        data: {
          account: create.account,
          token: cookie,
        },
      };
    },
    false,
    true,
  );

  logger.loadedController('auth');
};
