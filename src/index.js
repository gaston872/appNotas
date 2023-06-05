import app from './app'
import { Server as WebsocketServer} from 'socket.io';
import http from 'http';
import { Http2ServerRequest } from 'http2';
import sockets from './sockets';
import {PORT} from './config';

import {connectDB} from './db';

connectDB();

//CONECTAR SERVIDOR HTTP Y SOCKET
const server = http.createServer(app);
const httpServer = server.listen(PORT);
const io = new WebsocketServer(httpServer);
sockets(io)

console.log('Server is runnning on port', PORT);