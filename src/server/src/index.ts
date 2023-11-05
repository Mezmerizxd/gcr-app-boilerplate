import { logger } from './helpers/logger';
import { accountManager, serverManager, sessionManager } from './managers';
import Controllers from './controllers';

logger.start();

Controllers();

serverManager.start();
sessionManager.start();
accountManager.start();
