import { serverManager } from '../managers/server';
import { logger } from '../helpers/logger';
import Endpoint from '../helpers/endpoint';

export default (): void => {
  serverManager.socket.on('connection', (s) => {
    s.on('disconnect', () => {
      logger.info('Socket disconnected');
    });
  });

  Endpoint(serverManager.v1, '/test', false, async (req) => {
    return {
      data: {
        name: 'Abc',
      },
    };
  });

  logger.loadedController('test');
};
