import { logger } from './helpers/logger';
import { serverManager, sessionManager } from './managers';
import Controllers from './controllers';

logger.start();

Controllers();

serverManager.start();
sessionManager.start();
