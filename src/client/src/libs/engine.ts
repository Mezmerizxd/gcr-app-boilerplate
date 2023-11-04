import storage from './storage';

class Engine {
  protected static instance: Engine;

  static getInstance(): Engine {
    if (!Engine.instance) {
      Engine.instance = new Engine();
    }
    return Engine.instance;
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
    body: any,
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
      return 'http://localhost:4000/api/v1';
    } else {
      return `${origin}/api/v1`;
    }
  }
}

export const engine = Engine.getInstance();
