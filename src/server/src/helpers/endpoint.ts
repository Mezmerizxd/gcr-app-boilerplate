import * as express from 'express';
import { logger } from './logger';
import { inspect } from 'util';

function Endpoint<T extends keyof Server.Server.Apis>(
  version: express.Router,
  url: T,
  requireAuth: boolean,
  callback: (req: express.Request) => Promise<{
    server?: Server.Server.BaseResponse;
    data?: ReturnType<Server.Server.Apis[T]>;
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

export default Endpoint;