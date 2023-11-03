declare namespace Server {}

declare namespace Server.Socket {
  type ClientToServer = {
    testCTS: (data: { message: string }) => void;
  };
  type ServerToClient = {
    testSTC: (data: { message: string }) => void;
  };
}

declare namespace Server.Server {
  type BaseResponse = {
    success: boolean;
    error?: string;
  };

  type Posts = {
    ['/test-write']: () => {
      name: string;
    };
  };

  type Gets = {
    ['/test-read']: () => {
      name: string;
    };
  };
}

declare namespace Server.Helpers {
  type Log = {
    id: number;
    date: string;
    logs: string[];
  };
}
