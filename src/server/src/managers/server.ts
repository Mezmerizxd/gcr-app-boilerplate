import * as http from 'http';
import * as sckio from 'socket.io';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as fs from 'fs';
import { logger } from '../helpers/logger';
import * as WebSocket from 'ws';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

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

  v1: express.Router;
  supabase: SupabaseClient;

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
      this.supabase = createClient<Database>(process.env.PROD_SUPA_URL, process.env.PROD_SUPA_KEY);
      this._port = Number(process.env.PROD_SERVER_PORT);
    } else {
      this.supabase = createClient<Database>(process.env.DEV_SUPA_URL, process.env.DEV_SUPA_KEY);
      this._port = Number(process.env.DEV_SERVER_PORT);
    }

    this.socket = this._io.of('/socket').use((socket: sckio.Socket, next: (err?: Error) => void) => {
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
}

export const serverManager = ServerManager.getInstance();
