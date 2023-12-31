import { logger } from '../helpers/logger';
import { serverManager } from '../managers/server-manager';
import { Get } from '../helpers/artemis';

import { AuthController } from './auth-controller';
import { AccountController } from './account-controller';
import { MetricsController } from './metrics-controller';

export default (): void => {
  /**
   * @api {get} /get-socket-details
   * @apiName GetSocketDetails
   * @apiGroup v1
   */
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

  AuthController();
  AccountController();
  MetricsController();
};
