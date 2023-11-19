import { serverManager, accountManager, authManager } from '../managers';
import { logger } from '../helpers/logger';
import { Post } from '../helpers/artemis';

export const AuthController = (): void => {
  /**
   * @api {post} /auth/login
   * @apiName Login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   * @apiCurl curl -X POST -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"test"}' http://localhost:4000/api/v1/auth/login
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
      res.cookie('token', cookie);

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
   * @apiVersion 1.0.0
   * @apiCurl curl -X POST -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"test","username":"test"}' http://localhost:4000/api/v1/auth/create
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
      res.cookie('token', cookie);

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
