import { PrismaClient } from '@prisma/client';
import { serverManager } from './server-manager';
import * as crypto from 'crypto';
import { logger } from '../helpers/logger';

class SessionManager {
  protected static instance: SessionManager;

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  prisma: PrismaClient;

  _interval: NodeJS.Timeout | null = null;
  _intervalTime: number = 1000 * 60 * 60 * 12; // 12 hours

  constructor() {
    this.prisma = serverManager.prisma;
  }

  start() {
    logger.debug('[SessionManager] started');

    this.interval();

    if (this._interval) {
      clearInterval(this._interval);
    }
    this._interval = setInterval(() => this.interval(), this._intervalTime);
  }

  stop() {
    logger.debug('[SessionManager] stopped');

    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  restart() {
    this.stop();
    this.start();

    logger.debug('[SessionManager] restarted');
  }

  async interval() {
    logger.debug('[SessionManager] interval started');

    let sessions = await this.getAllSessions();
    if (!sessions) {
      return;
    }

    sessions = sessions.filter((session) => {
      if (session.expired) {
        return false;
      }
      return true;
    });

    const date = new Date();

    sessions.forEach((session) => {
      let expired = false;

      // check if session is expired
      if (session.expires < date) {
        expired = true;
      }

      if (expired) {
        this.expireSession(session);
        logger.debug(`[SessionManager] expired session: ${session.id}`);
      }
    });

    logger.debug('[SessionManager] interval finished');
  }

  async getAllSessions(): Promise<Session[] | null> {
    const sessions = await this.prisma.sessions.findMany();
    if (!sessions) {
      return null;
    }

    return sessions;
  }

  async getAllSessionsByAccountId(accountId: string): Promise<Session[] | null> {
    const sessions = await this.prisma.sessions.findMany({
      where: {
        account_id: accountId,
      },
    });
    if (!sessions) {
      return null;
    }

    return sessions;
  }

  async getSessionByToken(token: string): Promise<Session | null> {
    const session = await this.prisma.sessions.findFirst({
      where: {
        token: token,
      },
    });
    if (!session) {
      return null;
    }

    return session;
  }

  async getLatestSession(accountId: string): Promise<Session | null> {
    const session = await this.prisma.sessions.findFirst({
      where: {
        account_id: accountId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    if (!session) {
      return null;
    }

    return session;
  }

  async createSession(account: Account, device: string): Promise<Session | null> {
    const token = await this.createSessionToken();
    if (!token) {
      return null;
    }

    const session = await this.prisma.sessions.create({
      data: {
        account_id: account.id,
        token: token,
        device: device,
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7), // 7 days
      },
    });
    if (!session) {
      return null;
    }

    return session;
  }

  async expireSession(session: Session): Promise<Session | null> {
    const expiredSession = await this.prisma.sessions.update({
      where: {
        id: session.id,
      },
      data: {
        expired: true,
      },
    });
    if (!expiredSession) {
      return null;
    }

    return expiredSession;
  }

  async createSessionToken(): Promise<string | null> {
    let token = null;
    let retrys = 0;

    while (retrys < 5) {
      token = crypto.randomBytes(64).toString('hex');

      const session = await this.getSessionByToken(token);
      if (!session) {
        return token;
      }

      token = crypto.randomBytes(64).toString('hex');
      retrys++;
    }

    return token;
  }
}

export const sessionManager = SessionManager.getInstance();
