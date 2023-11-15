import { serverManager, metricsManager, sessionManager } from '../managers';
import { logger } from '../helpers/logger';

export const MetricsController = (): void => {
  serverManager.socket.on('connection', async (s) => {
    logger.debug('[MetricsController] Connection to socket established:', s.id);

    const auth = s.handshake.headers.authorization;
    if (!auth) {
      logger.debug('[MetricsController] No authorization header found');
      return;
    }

    const session = await sessionManager.getSessionByToken(auth);
    if (session.error) {
      logger.debug('[MetricsController] No session found,', session.error);
      return;
    }

    logger.debug(
      '[MetricsController] Session found, id:',
      session.session?.id,
      'accountId:',
      session.session?.account_id,
    );

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
