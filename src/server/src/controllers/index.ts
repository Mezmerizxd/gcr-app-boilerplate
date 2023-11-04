import { logger } from '../helpers/logger';
import { serverManager } from '../managers/server';
import endpoint from '../helpers/endpoint';

import Test from './test';

export default (): void => {
  endpoint.Get(serverManager.v1, '/get-socket-details', false, async () => {
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
  });

  logger.loadedController('index');

  Test();
};
