declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MODE: 'development' | 'production';
      DEV_SERVER_PORT: string;
      DEV_SOCKET_HOST: string;
      DEV_SERVER_HOST: string;
      DEV_SUPA_URL: string;
      DEV_SUPA_KEY: string;
      PROD_SERVER_PORT: string;
      PROD_SOCKET_HOST: string;
      PROD_SERVER_HOST: string;
      PROD_SUPA_URL: string;
      PROD_SUPA_KEY: string;
    }
  }
}

export {};
