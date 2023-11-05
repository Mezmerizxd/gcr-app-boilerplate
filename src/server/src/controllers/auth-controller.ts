import { serverManager, accountManager } from '../managers';
import { logger } from '../helpers/logger';
import { Post } from '../helpers/endpoint';

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
    async (req, body) => {
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
      if (login.error) {
        return {
          server: {
            success: false,
            error: login.error,
          },
        };
      }

      return {
        data: login.account,
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
    async (req, body) => {
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
      if (create.error) {
        return {
          server: {
            success: false,
            error: create.error,
          },
        };
      }

      return {
        data: create.account,
      };
    },
    false,
    true,
  );

  logger.loadedController('test');
};
