import { logger } from '../helpers/logger';
import { serverManager } from '../managers/server-manager';
import { Get } from '../helpers/endpoint';

import { TestController } from './test-controller';
import { AuthController } from './auth-controller';
import { AccountController } from './account-controller';

export default (): void => {
  Get(
    serverManager.v1,
    '/get-socket-details',
    async () => {
      let sockerUrl = null;

      if (serverManager._isProduction) {
        sockerUrl = process.env.PROD_SOCKET_HOST;
      } else {
        sockerUrl = process.env.DEV_SOCKET_HOST;
      }

      return {
        data: {
          socketUrl: sockerUrl,
        },
      };
    },
    false,
  );

  logger.loadedController('index');

  TestController();
  AuthController();
  AccountController();
};
