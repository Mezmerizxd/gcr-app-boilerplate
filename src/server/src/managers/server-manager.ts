import * as http from 'http';
import * as sckio from 'socket.io';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { logger } from '../helpers/logger';
import { PrismaClient } from '@prisma/client';
import SpotifyWebApi from 'spotify-web-api-node';

class ServerManager {
  protected static instance: ServerManager;

  static getInstance(): ServerManager {
    if (!ServerManager.instance) {
      ServerManager.instance = new ServerManager();
    }
    return ServerManager.instance;
  }

  _port: number;
  _http: http.Server;
  _io: sckio.Server;
  express: express.Application;
  socket: sckio.Namespace<Server.Socket.ClientToServer & Server.Socket.ServerToClient>;
  spotifyApi: SpotifyWebApi;

  v1: express.Router;
  prisma: PrismaClient;

  _staticFolderPath: string = '../../client';
  _isProduction: boolean;

  constructor() {
    // Check if we are inside a build folder
    if (__dirname.includes('build')) {
      this._isProduction = true;
    } else {
      this._isProduction = process.env.MODE === 'production';
    }

    this.express = express();
    this._http = require('http').Server(this.express);
    this._io = new sckio.Server(this._http, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    });
    this.v1 = express.Router();

    if (this._isProduction) {
      this._port = Number(process.env.PROD_SERVER_PORT);
    } else {
      this._port = Number(process.env.DEV_SERVER_PORT);
    }

    this.prisma = new PrismaClient();

    if (process.env.SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_SECRET || process.env.SPOTIFY_REDIRECT_URI) {
      this.spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
      });

      if (this.spotifyApi) {
        logger.info('Spotify API initialized');
      }
    }

    this.socket = this._io.of('/ws').use((socket: sckio.Socket, next: (err?: Error) => void) => {
      logger.incomingSocket(socket);
      next();
    });
  }

  start() {
    this.middlewares();

    this.express.use('/api/v1', this.v1);

    this.renderer();

    this._http.listen(this._port, (): void => {
      logger.info(`Server address http://localhost:${this._port}`);
    });
  }

  stop() {
    this._io.close();
    this._http.close();
    logger.info('Server stopped');
  }

  middlewares() {
    this.express.use((req: express.Request, res: express.Response, next) => {
      logger.incomingApi(req, res);
      next();
    });
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(
      bodyParser.json({
        limit: '50mb',
      }),
    );
    this.express.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: false,
      }),
    );
  }

  async renderer() {
    if (!this._isProduction) {
      this._staticFolderPath = '../../../client';
    }
    this.express.use(express.static(path.join(__dirname, `${this._staticFolderPath}/build`)));
    this.express.get('/*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, `${this._staticFolderPath}/build/index.html`));
    });
  }

  getDeviceData(request: express.Request): Server.Server.Device {
    return {
      userAgent: request.headers['user-agent'] as string,
      ip: request.ip as string,
      headers: '',
    };
  }
}

export const serverManager = ServerManager.getInstance();
