import { serverManager, metricsManager, authManager } from '../managers';
import { logger } from '../helpers/logger';

export const MetricsController = (): void => {
  serverManager.socket.on('connection', async (s) => {
    logger.debug('[MetricsController] Connection to socket established:', s.id);

    const auth = s.handshake.auth['token'];
    if (!auth) {
      logger.debug('[MetricsController] No cookie header found');
      return;
    }

    const account = authManager.verify(auth);
    if (!account) {
      logger.debug('[MetricsController] No account found');
      return;
    }

    s.on('getMetrics', () => {
      logger.debug('[MetricsController] getMetrics');

      const metrics = metricsManager.getMetrics();
      s.emit('sendMetrics', { metrics });
    });

    s.on('disconnect', () => {
      logger.info('Socket disconnected');
    });
  });

  logger.loadedController('metrics');
};
