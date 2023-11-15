import { DEVELOPMENT_SERVER_URL } from './constants';
import storage from './libs/storage';

class Server {
  protected static instance: Server;

  static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  serverUrl: string;
  socketUrl: string | null;

  profile: Profile | null = null;
  account: Account | null = null;

  constructor() {
    this.serverUrl = this.getServerUrl();
  }

  public async start() {
    this.socketUrl = (await this.GetSocketDetails()).data?.socketUrl;

    const token = storage.getToken();
  }

  public async GetSocketDetails(): Promise<{
    server: Server.Server.BaseResponse;
    data: ReturnType<Server.Server.Gets['/get-socket-details']> | null;
  }> {
    return await this.Get('/get-socket-details', false);
  }

  public async Login(body: Parameters<Server.Server.Posts['/auth/login']>[0]): Promise<{
    server: Server.Server.BaseResponse;
    data: ReturnType<Server.Server.Posts['/auth/login']> | null;
  }> {
    const account = await this.Post('/auth/login', false, body);
    if (account.data) {
      this.account = account.data;
      this.profile = {
        ...account.data,
      };
      account.data.sessions.forEach((session) => {
        if (session.expired === false) {
          storage.setToken(session.token);
        }
      });
    }
    return account;
  }

  public async Create(body: Parameters<Server.Server.Posts['/auth/create']>[0]): Promise<{
    server: Server.Server.BaseResponse;
    data: ReturnType<Server.Server.Posts['/auth/create']> | null;
  }> {
    const account = await this.Post('/auth/create', false, body);
    if (account.data) {
      this.account = account.data;
      this.profile = {
        ...account.data,
      };
      account.data.sessions.forEach((session) => {
        if (session.expired === false) {
          storage.setToken(session.token);
        }
      });
    }
    return account;
  }

  public async GetProfile(): Promise<{
    server: Server.Server.BaseResponse;
    data: ReturnType<Server.Server.Gets['/account/profile']> | null;
  }> {
    const profile = await this.Get('/account/profile', true);
    if (profile.data) {
      this.profile = profile.data;
    }
    return profile;
  }

  private async Patch<T extends keyof Server.Server.Patches>(
    event: T,
    authorization: boolean,
    body: any,
  ): Promise<{ server: Server.Server.BaseResponse; data: ReturnType<Server.Server.Patches[T]> | null }> {
    try {
      const response = await fetch(`${this.serverUrl}${event}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(authorization ? { Authorization: `${storage.getToken()}` } : {}),
        },
        body: JSON.stringify(body || {}),
      });
      const json = await response.json();
      const server = json.server;
      const data = json.data;
      if (!server) {
        server.success = false;
        server.error = 'Server response is null';
      }
      return { server, data };
    } catch (e) {
      return { server: { success: false, error: 'Something went wrong, try again later.' }, data: null };
    }
  }

  private async Post<T extends keyof Server.Server.Posts>(
    event: T,
    authorization: boolean,
    body: Parameters<Server.Server.Posts[T]>[0],
  ): Promise<{ server: Server.Server.BaseResponse; data: ReturnType<Server.Server.Posts[T]> | null }> {
    try {
      const response = await fetch(`${this.serverUrl}${event}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authorization ? { Authorization: `${storage.getToken()}` } : {}),
        },
        body: JSON.stringify(body || {}),
      });
      console.log('Engine: ', response);
      console.log(`${this.serverUrl}${event}`);
      const json = await response.json();
      const server = json.server;
      const data = json.data;
      if (!server) {
        server.success = false;
        server.error = 'Server response is null';
      }
      return { server, data };
    } catch (e) {
      return { server: { success: false, error: 'Something went wrong, try again later.' }, data: null };
    }
  }

  private async Get<T extends keyof Server.Server.Gets>(
    event: T,
    authorization: boolean,
  ): Promise<{ server: Server.Server.BaseResponse; data: ReturnType<Server.Server.Gets[T]> | null }> {
    try {
      const response = await fetch(`${this.serverUrl}${event}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(authorization ? { Authorization: `${storage.getToken()}` } : {}),
        },
      });

      const json = await response.json();
      const server = json.server;
      const data = json.data;
      if (!server) {
        server.success = false;
        server.error = 'Server response is null';
      }
      return { server, data };
    } catch (e) {
      return { server: { success: false, error: 'Something went wrong, try again later.' }, data: null };
    }
  }

  private getServerUrl(): string {
    const { port, origin } = window.location;

    if (port === '8080') {
      return DEVELOPMENT_SERVER_URL;
    } else {
      return `${origin}/api/v1`;
    }
  }
}

export const server = Server.getInstance();
