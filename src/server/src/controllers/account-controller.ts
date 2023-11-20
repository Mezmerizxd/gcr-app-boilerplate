import { serverManager, accountManager } from '../managers';
import { logger } from '../helpers/logger';
import { Get } from '../helpers/artemis';

export const AccountController = (): void => {
  /**
   * @api {get} /account/profile
   * @apiName Profile
   * @apiGroup Account
   */
  Get(
    serverManager.v1,
    '/account/profile',
    async (_, __, account) => {
      if (!account) {
        return {
          server: {
            success: false,
            error: 'Account not found',
          },
        };
      }

      const profile = accountManager.convertAccountToProfile(account);

      return {
        data: profile,
      };
    },
    true,
  );

  logger.loadedController('account');
};
