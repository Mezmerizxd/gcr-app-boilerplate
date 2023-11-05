import { serverManager } from '../managers';
import { logger } from '../helpers/logger';
import { Post, Get } from '../helpers/endpoint';

export const TestController = (): void => {
  serverManager.socket.on('connection', (s) => {
    s.on('disconnect', () => {
      logger.info('Socket disconnected');
    });
  });

  Post(
    serverManager.v1,
    '/test-write',
    async (req) => {
      return {
        data: {
          name: 'Empty',
        },
      };
    },
    false,
    true,
  );

  Get(serverManager.v1, '/test-read', false, async (req) => {
    return {
      data: 'a',
    };
  });

  logger.loadedController('test');
};
