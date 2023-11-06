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
    if (!sessions.sessions) {
      return;
    }

    sessions.sessions = sessions.sessions.filter((session) => {
      if (session.expired) {
        return false;
      }
      return true;
    });

    const date = new Date();

    sessions.sessions.forEach((session) => {
      const expired = this.isSessionDateExpired(session);

      if (expired) {
        this.expireSession(session);
        logger.debug(`[SessionManager] expired session: ${session.id}`);
      }
    });

    logger.debug('[SessionManager] interval finished');
  }

  isSessionDateExpired(session: Session): boolean {
    const date = new Date();
    if (session.expires < date) {
      return true;
    }

    return false;
  }

  async getAllSessions(): Promise<{ sessions?: Session[]; error?: string }> {
    const sessions = await this.prisma.sessions.findMany();
    if (!sessions) {
      return { error: 'no sessions found' };
    }

    return { sessions: sessions };
  }

  async getAllSessionsByAccountId(accountId: string): Promise<{ sessions?: Session[]; error?: string }> {
    const sessions = await this.prisma.sessions.findMany({
      where: {
        account_id: accountId,
      },
    });
    if (!sessions) {
      return { error: 'no sessions found' };
    }

    return { sessions: sessions };
  }

  async getSessionByToken(token: string): Promise<{ session?: Session; error?: string }> {
    const session = await this.prisma.sessions.findFirst({
      where: {
        token: token,
      },
    });
    if (!session) {
      return { error: 'no session found' };
    }

    const expired = this.isSessionDateExpired(session);
    if (expired) {
      this.expireSession(session);
      return { error: 'session expired' };
    }

    return { session: session };
  }

  async getLatestSession(accountId: string): Promise<{ session?: Session; error?: string }> {
    const session = await this.prisma.sessions.findFirst({
      where: {
        account_id: accountId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    if (!session) {
      return { error: 'no session found' };
    }

    const expired = this.isSessionDateExpired(session);
    if (expired) {
      this.expireSession(session);
      return { error: 'session expired' };
    }

    return { session: session };
  }

  async createSession(accountId: string, device: string): Promise<{ session?: Session; error?: string }> {
    const token = await this.createSessionToken();
    if (!token.token) {
      logger.debug('[SessionManager] createSession failed to create token');
      return { error: token.error };
    }

    const session = await this.prisma.sessions.create({
      data: {
        account_id: accountId,
        token: token.token,
        device: device,
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7), // 7 days
      },
    });
    if (!session) {
      logger.debug('[SessionManager] createSession failed to add session to database');
      return { error: 'no session created' };
    }

    return { session: session };
  }

  async expireSession(session: Session): Promise<{ session?: Session; error?: string }> {
    const expiredSession = await this.prisma.sessions.update({
      where: {
        id: session.id,
      },
      data: {
        expired: true,
      },
    });
    if (!expiredSession) {
      return { error: 'no session expired' };
    }

    return { session: expiredSession };
  }

  async createSessionToken(): Promise<{ token?: string; error?: string }> {
    const MAX_RETRIES = 5;
    let token: string | null = null;

    for (let i = 0; i < MAX_RETRIES; i++) {
      token = crypto.randomBytes(64).toString('hex');
      if (!token) {
        logger.debug('[SessionManager] createSessionToken failed to create token');
        return { error: 'no token created' };
      }

      try {
        const session = await this.getSessionByToken(token);
        if (!session.session) {
          return { token: token };
        } else {
          logger.debug('[SessionManager] createSessionToken token already exists');
          return { error: session.error };
        }
      } catch (error) {
        return { error: 'something went wrong created token' };
      }
    }

    if (token) {
      return { token: token };
    } else {
      logger.debug('[SessionManager] createSessionToken failed to create token');
      return { error: 'failed to create token' };
    }
  }
}

export const sessionManager = SessionManager.getInstance();
