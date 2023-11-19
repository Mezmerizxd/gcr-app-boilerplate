import { serverManager, accountManager } from '../managers';
import { logger } from '../helpers/logger';
import { Get } from '../helpers/artemis';

export const AccountController = (): void => {
  /**
   * @api {get} /account/profile
   * @apiName Profile
   * @apiGroup Account
   * @apiVersion 1.0.0
   * @apiCurl curl -X GET -H "Content-Type: application/json" -H "Authorization: abc123"  http://localhost:4000/api/v1/account/profile
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
