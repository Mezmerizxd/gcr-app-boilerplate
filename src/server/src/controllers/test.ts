import { serverManager } from '../managers/server';
import { logger } from '../helpers/logger';
import Endpoint from '../helpers/endpoint';

export default (): void => {
  serverManager.socket.on('connection', (s) => {
    s.on('disconnect', () => {
      logger.info('Socket disconnected');
    });
  });

  Endpoint.Post(serverManager.v1, '/test-write', false, async (req) => {
    return {
      data: {
        name: 'Empty',
      },
    };
  });

  Endpoint.Get(serverManager.v1, '/test-read', false, async (req) => {
    return {
      data: 'a',
    };
  });

  logger.loadedController('test');
};
