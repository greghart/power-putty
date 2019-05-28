/**
 * Get an Express application
 */
import express from 'express';
import session from 'express-session';
import favicon from 'serve-favicon';
import helmet from 'helmet';
const state = require('express-state');
import bodyParser from 'body-parser';
import serveStatic from 'serve-static';
import cookieParser from 'cookie-parser';
import connectFlash from 'connect-flash';
import cors from 'cors';
import * as path from 'path';
import config from 'config';

import isLocal from './util/isLocal';
import getSessionOptions from './sessions/getSessionOptions';

// Application with express-state
interface Application extends express.Express {
  expose: (data: any, key: string) => any;
}

// Can be user-supplied, or setup through `config`
interface Options {
  port: number | string;
  isLocal: boolean
  cookies: {
    secret: string;
  };
  sessions: {
    prefix: string;
    secret: string;
    redis: {
      host: string;
      port: number;
    };
  };
  serving: {
    favicon: string;
    static: string;
  }
}

// Safely get a config, return undefined if it's not set
function safeGet<T=string>(setting: string): T | undefined {
  if (config.has(setting)) {
    return config.get<T>(setting);
  }
  return;
}
function getExpressApplication(_app?: express.Express, _options?: Partial<Options>) {
  const app = _app ? _app : (express() as Application);
  const options: Options = {
    port: safeGet<number>('port'),
    isLocal: isLocal(),
    cookies: {
      secret: safeGet<string>('power-putty-server.cookies.secret')
    },
    sessions: {
      prefix: safeGet<string>('power-putty-server.sessions.prefix'),
      secret: safeGet<string>('power-putty-server.sessions.secret'),
      redis: {
        host: safeGet<string>('power-putty-server.sessions.redis.host'),
        port: safeGet<number>('power-putty-server.sessions.redis.port')
      },
    },
    serving: {
      favicon: safeGet<string>('power-putty-server.serving.favicon'),
      static: safeGet<string>('power-putty-server.serving.static')
    },
    ..._options,
  }
  // TODO options validation step?

  state.extend(app);

  // Basic server setup
  app.set('trust proxy', 1);
  app.set('port', options.port);
  // Server favicon
  if (options.serving.favicon) {
    app.use(
      favicon(options.serving.favicon)
    );
  }
  // Security headers can make things annoying during local dev
  if (!options.isLocal) {
    app.use(helmet());
  }
  app.use(cors({ origin: '*' }));
  // Body parse support
  app.use(bodyParser.json({
    limit: '100mb',
    strict: false,
  }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  // Static files
  if (options.serving.static) {
    app.use(
      '/static', 
      serveStatic(options.serving.static)
    );
  }
  // app.use('/static', serveStatic(
  //   path.join(__dirname, '../../../static'),
  // ));

  // Setup cookies and sessions
  app.use(
    cookieParser(
      options.cookies.secret
    ),
  );
  app.use(
    session(
      getSessionOptions(
        options.isLocal,
        options.sessions.secret,
        options.sessions.redis.host,
        options.sessions.redis.port
      )
    ),
  );
  app.use(connectFlash());

  // Add for local testing
  app.use((req, res, next) => {
    if (options.isLocal) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    } 
    next();
  });

  // IO Engine
  // app.use('/uploads', ioEngineRouter);
  // app.use('/api', api);
  // // Allow unauthorized access to API docs, and expose to all requests
  // app.get('/api-docs', (req, res, next) => {
  //   res.send(apiRouter.apiDocs);
  // });
  // app.expose(apiRouter.apiDocs, 'apiDocs');

  // app.use(getAuthRouter());

  // TODO Re-implement or module validate middleware, authorize middleware
  // app.use(apiRouter);

  // app.use(getServerRenderMiddleware());

  // app.use(UniversalErrorMiddleware);
  // app.use(getServerErrorMiddleware());

  // app.use((req, res, next) => {
  //   res.status(404).send("Sorry can't find that!");
  // });

  return app;
}

export default getExpressApplication;
