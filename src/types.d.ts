type TestingDatabaseAndController = {
  id: number;
  message: string;
  created_at: any;
};

interface Session {
  id: string;
  token: string;
  expires: Date;
  expired: boolean;
  device: string;
  account_id: string;
  created_at: Date;
}

interface Profile {
  id: string;
  username: string;
  role: 'ADMIN' | 'DEVELOPER' | 'USER';
  avatar_url?: string | null;
}

interface Account {
  id: string;
  username: string;
  role: 'ADMIN' | 'DEVELOPER' | 'USER';
  avatar_url?: string | null;
  email: string;
  password: string;
  sessions: Session[];
  created_at: Date;
  updated_at: Date;
}

declare namespace Server {
  type MetricsData = {
    platform: string;
    process_uptime: number;
    uptime: number;
    cpu_usage: number;
    cpu_count: number;
    cpu_free: number;
    mem_usage: number;
    mem_total: number;
    mem_free: number;
  };
}

declare namespace Server.Socket {
  type ClientToServer = {
    testCTS: (data: { message: string }) => void;
    getMetrics: () => void;
  };
  type ServerToClient = {
    testSTC: (data: { message: string }) => void;
    sendMetrics: (data: { metrics: Server.MetricsData }) => any;
  };
}

declare namespace Server.Server {
  type BaseResponse = {
    success: boolean;
    error?: string;
  };

  type Device = {
    userAgent?: string;
    ip?: string;
    headers?: string;
  };

  type Posts = {
    ['/test-write']: () => {
      name: string;
    };

    /* AUTH */
    ['/auth/login']: (data: LoginAccountData) => Account | null;
    ['/auth/create']: (data: CreateAccountData) => Account | null;
  };

  type Gets = {
    ['/test-read']: () => any;

    ['/get-socket-details']: () => {
      socketUrl: string;
    };

    /* ACCOUNT */
    ['/account/profile']: () => Profile | null;

    /* SPOTIFY */
    ['/spotify/test']: () => any;
  };

  type Patches = {};
}

declare namespace Server.Helpers {
  type Log = {
    id: number;
    date: string;
    logs: string[];
  };
}

type FnError = {
  error: string;
};

type CreateAccountData = {
  username: string;
  email: string;
  password: string;
};

type LoginAccountData = {
  email: string;
  password: string;
};
