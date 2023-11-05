import * as express from 'express';
import { logger } from './logger';
import { inspect } from 'util';
import { accountManager } from '../managers';

export function Post<T extends keyof Server.Server.Posts>(
  version: express.Router,
  url: T,
  callback: (
    req: express.Request,
    body: Parameters<Server.Server.Posts[T]>[0],
    account?: Account,
  ) => Promise<{
    server?: Server.Server.BaseResponse;
    data?: ReturnType<Server.Server.Posts[T]>;
  }>,
  requireAuth: boolean = false,
  requireBody: boolean = false,
): void {
  version.post(url, async (req, res) => {
    logger.debug(`Endpoint | Incoming: ${url} | ${inspect(req.body, { depth: 4, colors: true })}`);

    if (requireBody && !req.body) {
      res.json({
        server: {
          success: false,
          error: 'Body not found',
        },
      });
      return;
    }

    if (requireAuth) {
      const { authorization } = req.headers;
      if (!authorization) {
        res.json({
          server: {
            success: false,
            error: 'Authorization header not found',
          },
        });
        return;
      }

      const account = await accountManager.getAccountByToken(authorization);
      if (!account.account) {
        res.json({
          server: {
            success: false,
            error: account.error,
          },
        });
        return;
      }

      const result = await callback(req, req.body, account.account);
      if (!result.server || result.server.success) {
        result.server = {
          success: true,
        };
      }

      logger.debug(`Endpoint | Outgoing: ${url} | ${inspect(result, { depth: 4, colors: true })}`);
      res.json(result);
      return;
    }
    const result = await callback(req, req.body);
    if (!result.server || result.server.success) {
      result.server = {
        success: true,
      };
    }

    logger.debug(`Endpoint | Outgoing: ${url} | ${inspect(result, { depth: 4, colors: true })}`);
    res.json(result);
  });
}

export function Get<T extends keyof Server.Server.Gets>(
  version: express.Router,
  url: T,
  callback: (
    req: express.Request,
    account?: Account,
  ) => Promise<{
    server?: Server.Server.BaseResponse;
    data?: ReturnType<Server.Server.Gets[T]>;
  }>,
  requireAuth: boolean = false,
): void {
  version.get(url, async (req, res) => {
    logger.debug(`Endpoint | Incoming: ${url} | ${inspect(req?.body, { depth: 4, colors: true })}`);

    if (requireAuth) {
      const { authorization } = req.headers;
      if (!authorization) {
        res.json({
          server: {
            success: false,
            error: 'Authorization header not found',
          },
        });
        return;
      }

      const account = await accountManager.getAccountByToken(authorization);
      if (!account.account) {
        res.json({
          server: {
            success: false,
            error: account.error,
          },
        });
        return;
      }

      const result = await callback(req, account.account);
      if (!result.server || result.server.success) {
        result.server = {
          success: true,
        };
      }

      logger.debug(`Endpoint | Outgoing: ${url} | ${inspect(result, { depth: 4, colors: true })}`);
      res.json(result);
      return;
    }
    const result = await callback(req);
    if (!result.server || result.server.success) {
      result.server = {
        success: true,
      };
    }

    logger.debug(`Endpoint | Outgoing: ${url} | ${inspect(result, { depth: 4, colors: true })}`);
    res.json(result);
  });
}
