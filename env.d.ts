declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MODE: 'development' | 'production';
      DEV_SERVER_PORT: string;
      DEV_SOCKET_HOST: string;
      DEV_SERVER_HOST: string;
      PROD_SERVER_PORT: string;
      PROD_SOCKET_HOST: string;
      PROD_SERVER_HOST: string;
      POSTGRES_URL: string;
      JWT_SECRET_KEY: string;
    }
  }

  namespace Express {
    interface Request {
      user?: Profile;
    }
  }
}

export {};
