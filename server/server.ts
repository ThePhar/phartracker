import http from 'http';
import { createStore } from 'redux';
import createApp from './app';
import saveRAMReducer from './reducers/saveRAM';

import printFancyConsole from './util/formatLuaJsonForConsole';

const store = createStore(saveRAMReducer);
// TODO: Remove this console formatter script when developing the front-end part of the app.
store.subscribe(() => printFancyConsole(store.getState()));

const app = createApp(store);
http.createServer({}, app).listen(9876);
