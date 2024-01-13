type TestingDatabaseAndController = {
  id: number;
  message: string;
  created_at: any;
};

type Roles = 'ADMIN' | 'USER';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Roles;
}

interface Account {
  id: string;
  first_name: string;
  last_name: string;
  role: Roles;
  email: string;
  password: string;
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
    sendMetrics: (data: { metrics: MetricsData }) => any;
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
    ['/auth/login']: (data: LoginAccountData) => {
      account: Account;
      token: string;
    } | null;
    ['/auth/create']: (data: CreateAccountData) => {
      account: Account;
      token: string;
    } | null;
  };

  type Gets = {
    ['/test-read']: () => any;

    ['/get-socket-details']: () => {
      socketUrl: string;
    };

    /* ACCOUNT */
    ['/account/profile']: () => Profile | null;
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
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

type LoginAccountData = {
  email: string;
  password: string;
};

declare namespace Data {
  interface Defect {
    id: string;
    name: string;
    category: 'major' | 'minor' | 'dangerous';
  }

  interface Section {
    id: string;
    name: string;
    description?: string | null;
    defects?: Defect[] | null;
    sections?: Section[] | null;
  }

  type Mot = Section[];
}
