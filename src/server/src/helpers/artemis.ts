import * as express from 'express';
import { logger } from './logger';
import { inspect } from 'util';
import { accountManager, authManager } from '../managers';

/**
 * @param res - The Express response object to send the HTTP response.
 * @param url - The URL associated with the response.
 * @param result - An object containing server and data properties.
 *   @property {Server.Server.BaseResponse} server - Server response object with a success property.
 *   @property {any} data - Additional data to be included in the response.
 * @returns {void}
 * @description Handles the response by checking the success property in the server object,
 *              setting it to true if not present, logging the outgoing endpoint and response,
 *              and sending the JSON response using the Express response object.
 */
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

/**
 * @param version - The Express router version to handle the POST request.
 * @param url - The URL associated with the POST request.
 * @param callback - The callback function to be executed on handling the POST request.
 *   @param req - The Express request object.
 *   @param res - The Express response object.
 *   @param body - The request body of type Parameters<Server.Server.Posts[T]>[0].
 *   @param account - An optional parameter representing user account information.
 * @param requireAuth - A boolean indicating whether authentication is required (default: false).
 * @param requireBody - A boolean indicating whether a request body is required (default: false).
 * @returns {void}
 * @description Handles POST requests, performs authentication if required, and executes the callback function,
 *              logging the incoming endpoint and request body, and sending the JSON response using the handleResponse function.
 */
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

/**
 * @param version - The Express router version to handle the GET request.
 * @param url - The URL associated with the GET request.
 * @param callback - The callback function to be executed on handling the GET request.
 *   @param req - The Express request object.
 *   @param res - The Express response object.
 *   @param account - An optional parameter representing user account information.
 * @param requireAuth - A boolean indicating whether authentication is required (default: false).
 * @returns {void}
 * @description Handles GET requests, performs authentication if required, and executes the callback function,
 *              logging the incoming endpoint and request body, and sending the JSON response using the handleResponse function.
 */
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
