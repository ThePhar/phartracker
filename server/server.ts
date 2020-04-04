import http from 'http';
import createApp from './app';

const app = createApp();
http.createServer({}, app).listen(9876);
