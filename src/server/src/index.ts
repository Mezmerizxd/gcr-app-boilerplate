import { logger } from './helpers/logger';
import { accountManager, serverManager, metricsManager, authManager } from './managers';
import Controllers from './controllers';

logger.start();

Controllers();

authManager.start();
serverManager.start();
accountManager.start();
metricsManager.start();
