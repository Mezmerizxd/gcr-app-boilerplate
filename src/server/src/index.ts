import { logger } from './helpers/logger';
import { serverManager } from './managers/server';
import Controllers from './controllers';

logger.start();

Controllers();

serverManager.start();
