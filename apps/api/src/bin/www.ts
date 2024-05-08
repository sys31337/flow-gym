import http from 'http';
import app from '@api/app';
import { log, logError } from '@repo/utils';
import db from '@api/config/db';

interface IError { syscall: string, code: string }

function normalizePort(val: string): number | string {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return 3000;
}

const dynamicPort = process?.env.NODE_ENV === 'development' ? process.env.DEV_PORT : process.env.PORT;
const PORT: number | string = normalizePort(dynamicPort || '3000');
app.set('port', PORT);

const server = http.createServer(app);

const onError = (error: IError) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind: string = typeof PORT === 'string'
    ? `Pipe ${PORT}`
    : `Port ${PORT}`;

  switch (error.code) {
    case 'EACCES':
      logError(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logError(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = (): void => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `Pipe ${addr}`
    : `Port ${PORT}`;
  log(`Listening on ${bind}`);
  db.once('open', () => {
    log('Database Connected');
  });

  db.on('error', (error: Error) => {
    logError('Database Connection error:', error);
  });
};

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

export default server;
