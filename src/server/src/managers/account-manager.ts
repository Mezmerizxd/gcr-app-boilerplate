import { PrismaClient } from '@prisma/client';
import { serverManager } from './';
import * as crypto from 'crypto';
import { logger } from '../helpers/logger';

class AccountManager {
  protected static instance: AccountManager;

  static getInstance(): AccountManager {
    if (!AccountManager.instance) {
      AccountManager.instance = new AccountManager();
    }
    return AccountManager.instance;
  }

  prisma: PrismaClient;

  _interval: NodeJS.Timeout | null = null;
  _intervalTime: number = 1000 * 60 * 60 * 12; // 12 hours

  _maxPasswordLength: number = 64;
  _minPasswordLength: number = 1;
  _maxNameLength: number = 32;
  _minNameLength: number = 1;

  constructor() {
    this.prisma = serverManager.prisma;
  }

  start() {
    logger.debug('[AccountManager] started');

    this.interval();

    if (this._interval) {
      clearInterval(this._interval);
    }
    this._interval = setInterval(() => this.interval(), this._intervalTime);
  }

  stop() {
    logger.debug('[AccountManager] stopped');

    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  restart() {
    logger.debug('[AccountManager] restarted');

    this.stop();
    this.start();
  }

  async interval() {
    logger.debug('[AccountManager] interval started');

    logger.debug('[AccountManager] interval finished');
  }

  async getAllAccounts(): Promise<{
    accounts?: Account[];
    error?: string;
  }> {
    const accounts = await this.prisma.accounts.findMany({});
    if (!accounts) {
      logger.debug('[AccountManager] getAllAccounts no accounts found');
      return {
        error: 'No accounts found',
      };
    }

    return {
      accounts,
    };
  }

  async getAccountById(id: string): Promise<{
    account?: Account;
    error?: string;
  }> {
    const account = await this.prisma.accounts.findUnique({
      where: {
        id,
      },
    });
    if (!account) {
      logger.debug('[AccountManager] getAccountById no account found');
      return {
        error: 'No account found',
      };
    }

    return {
      account,
    };
  }

  async getAccountByEmail(email: string): Promise<{
    account?: Account;
    error?: string;
  }> {
    const account = await this.prisma.accounts.findUnique({
      where: {
        email,
      },
    });
    if (!account) {
      logger.debug('[AccountManager] getAccountByEmail no account found');
      return {
        error: 'No account found',
      };
    }

    return {
      account,
    };
  }

  async loginAccount(
    data: LoginAccountData,
    device: string,
  ): Promise<{
    account?: Account;
    error?: string;
  }> {
    const account = await this.prisma.accounts.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!account) {
      logger.debug('[AccountManager] loginAccount no account found');
      return {
        error: 'No account found',
      };
    }

    return {
      account: account,
    };
  }

  async createAccount(
    data: CreateAccountData,
    device: string,
  ): Promise<{
    account?: Account;
    error?: string;
  }> {
    const emailCheck = await this.prisma.accounts.findUnique({
      where: {
        email: data.email,
      },
    });
    if (emailCheck) {
      return {
        error: 'Email already exists',
      };
    }

    const account = await this.prisma.accounts.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: crypto.createHash('sha256').update(data.password).digest('hex'),
      },
    });
    if (!account) {
      return {
        error: 'Failed to create account',
      };
    }

    return {
      account: account,
    };
  }

  convertAccountToProfile(account: Account): Profile {
    return {
      id: account.id,
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      role: account.role,
    };
  }

  scanLoginData(data: LoginAccountData): {
    error: string | null;
  } {
    if (!data.email || !data.password) {
      return {
        error: 'Missing data',
      };
    }

    // Use regex to check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(data.email)) {
      return {
        error: 'Invalid email',
      };
    }

    // Password
    if (data.password.length > this._maxPasswordLength) {
      return {
        error: 'Password too long',
      };
    }
    if (data.password.length < this._minPasswordLength) {
      return {
        error: 'Password too short',
      };
    }

    return { error: null };
  }

  scanCreateData(data: CreateAccountData): {
    error: string | null;
  } {
    if (!data.first_name || !data.last_name || !data.email || !data.password) {
      return {
        error: 'Missing data',
      };
    }

    // First Name
    if (data.first_name.length > this._maxNameLength) {
      return {
        error: 'First name too long',
      };
    }
    if (data.first_name.length < this._minNameLength) {
      return {
        error: 'First name too short',
      };
    }
    // Last Name
    if (data.last_name.length > this._maxNameLength) {
      return {
        error: 'Last name too long',
      };
    }
    if (data.last_name.length < this._minNameLength) {
      return {
        error: 'Last name too short',
      };
    }

    // Use regex to check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(data.email)) {
      return {
        error: 'Invalid email',
      };
    }

    // Password
    if (data.password.length > this._maxPasswordLength) {
      return {
        error: 'Password too long',
      };
    }
    if (data.password.length < this._minPasswordLength) {
      return {
        error: 'Password too short',
      };
    }

    return { error: null };
  }
}

export const accountManager = AccountManager.getInstance();
