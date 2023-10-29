declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MODE: 'development' | 'production';
      SERVER_PORT: string;
      SOCKET_HOST: string;
      SERVER_HOST: string;
      PLANET_SCALE_DSN: string;
      SUPA_URL: string;
      SUPA_KEY: string;
    }
  }
}

export {};
