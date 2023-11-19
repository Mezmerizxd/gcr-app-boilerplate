import { PrismaClient } from '@prisma/client';
import { serverManager } from './server-manager';
import { logger } from '../helpers/logger';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

class AuthManager {
  protected static instance: AuthManager;

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  prisma: PrismaClient;

  _interval: NodeJS.Timeout | null = null;
  _intervalTime: number = 1000 * 60 * 60 * 12; // 12 hours

  jwtSecretKey: string;

  constructor() {
    this.prisma = serverManager.prisma;
  }

  start() {
    logger.debug('[AuthManager] started');

    if (process.env.JWT_SECRET_KEY !== '' && process.env.JWT_SECRET_KEY !== undefined) {
      this.jwtSecretKey = process.env.JWT_SECRET_KEY;
    } else {
      logger.error('[AuthManager] JWT_SECRET_KEY not found in env');
      process.exit(1);
    }
  }

  sign(user: Account): string {
    return jwt.sign(user, process.env.JWT_SECRET_KEY);
  }

  verify(token: string): Promise<Account | null> {
    return new Promise((resolve) => {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err: VerifyErrors, user: Account) => {
        if (err) {
          logger.debug('[AuthManager] Error verifying token:', err);
          resolve(null);
        } else {
          resolve(user);
        }
      });
    });
  }

  authenticate(req: Request, res: Response, next: NextFunction) {
    if (!process.env.JWT_SECRET_KEY) {
      res.status(401).send('No JWT_SECRET_KEY found in env');
    }
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    this.verify(token).then((user) => {
      if (!user) {
        return res.status(403).send('Forbidden');
      }
      req.user = user;
      next();
    });

    // jwt.verify(token, process.env.JWT_SECRET_KEY, (err: VerifyErrors, user: Account) => {
    //   if (err) return res.sendStatus(403);

    //   req.user = user;
    //   next();
    // });
  }
}

export const authManager = AuthManager.getInstance();
