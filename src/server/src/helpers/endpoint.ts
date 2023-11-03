import * as express from 'express';
import { logger } from './logger';
import { inspect } from 'util';

function Post<T extends keyof Server.Server.Posts>(
  version: express.Router,
  url: T,
  requireAuth: boolean,
  callback: (req: express.Request) => Promise<{
    server?: Server.Server.BaseResponse;
    data?: ReturnType<Server.Server.Posts[T]>;
  }>,
): void {
  version.post(url, async (req, res) => {
    logger.debug(`Endpoint | Incoming: ${url} | ${inspect(req.body, { depth: 4, colors: true })}`);

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

      const result = await callback(req);
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

function Get<T extends keyof Server.Server.Gets>(
  version: express.Router,
  url: T,
  requireAuth: boolean,
  callback: (req: express.Request) => Promise<{
    server?: Server.Server.BaseResponse;
    data?: ReturnType<Server.Server.Gets[T]>;
  }>,
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

      const result = await callback(req);
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

export default { Post, Get };
