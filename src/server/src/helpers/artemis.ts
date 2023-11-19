import * as express from 'express';
import { logger } from './logger';
import { inspect } from 'util';
import { accountManager, authManager } from '../managers';

function handleResponse(
  res: express.Response,
  url: string,
  result: {
    server?: Server.Server.BaseResponse;
    data?: any;
  },
): void {
  if (!result.server || result.server.success) {
    result.server = { success: true };
  }

  logger.debug(`Endpoint | Outgoing: ${url} | ${inspect(result, { depth: 4, colors: true })}`);
  res.json(result);
}

export function Post<T extends keyof Server.Server.Posts>(
  version: express.Router,
  url: T,
  callback: (
    req: express.Request,
    res: express.Response,
    body: Parameters<Server.Server.Posts[T]>[0],
    account?: Account,
  ) => Promise<{
    server?: Server.Server.BaseResponse;
    data?: ReturnType<Server.Server.Posts[T]>;
  }>,
  requireAuth: boolean = false,
  requireBody: boolean = false,
): void {
  if (requireAuth) {
    version.post(url, authManager.authenticate, async (req, res) => {
      logger.debug(`Endpoint | Incoming: ${url} | ${inspect(req.body, { depth: 4, colors: true })}`);

      if (!req.user) {
        handleResponse(res, url, {
          server: {
            success: false,
            error: 'User not found',
          },
        });
        return;
      }

      if (requireBody && !req.body) {
        handleResponse(res, url, {
          server: {
            success: false,
            error: 'Body not found',
          },
        });
        return;
      }

      const account = await accountManager.getAccountById(req.user.id);
      if (!account.account) {
        handleResponse(res, url, {
          server: {
            success: false,
            error: account.error,
          },
        });
        return;
      }

      const result = await callback(req, res, req.body, account.account);
      handleResponse(res, url, result);
    });
  } else {
    version.post(url, async (req, res) => {
      logger.debug(`Endpoint | Incoming: ${url} | ${inspect(req.body, { depth: 4, colors: true })}`);

      if (requireBody && !req.body) {
        handleResponse(res, url, {
          server: {
            success: false,
            error: 'Body not found',
          },
        });
        return;
      }

      const result = await callback(req, res, req.body);
      handleResponse(res, url, result);
    });
  }
}

export function Get<T extends keyof Server.Server.Gets>(
  version: express.Router,
  url: T,
  callback: (
    req: express.Request,
    res: express.Response,
    account?: Account,
  ) => Promise<{
    server?: Server.Server.BaseResponse;
    data?: ReturnType<Server.Server.Gets[T]>;
  }>,
  requireAuth: boolean = false,
): void {
  if (requireAuth) {
    version.get(url, authManager.authenticate, async (req, res) => {
      logger.debug(`Endpoint | Incoming: ${url} | ${inspect(req?.body, { depth: 4, colors: true })}`);

      if (!req.user) {
        handleResponse(res, url, {
          server: {
            success: false,
            error: 'User not found',
          },
        });
        return;
      }

      const account = await accountManager.getAccountById(req.user.id);
      if (!account.account) {
        handleResponse(res, url, {
          server: {
            success: false,
            error: account.error,
          },
        });
        return;
      }

      const result = await callback(req, res, account.account);
      handleResponse(res, url, result);
    });
  } else {
    version.get(url, async (req, res) => {
      logger.debug(`Endpoint | Incoming: ${url} | ${inspect(req?.body, { depth: 4, colors: true })}`);

      const result = await callback(req, res);
      handleResponse(res, url, result);
    });
  }
}
