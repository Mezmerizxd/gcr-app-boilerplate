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
      SPOTIFY_CLIENT_ID: string;
      SPOTIFY_CLIENT_SECRET: string;
      SPOTIFY_REDIRECT_URI: string;
    }
  }
}

export {};
