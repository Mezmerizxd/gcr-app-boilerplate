import { logger } from '../helpers/logger';

import Test from './test';

export default (): void => {
  logger.loadedController('index');

  Test();
};
