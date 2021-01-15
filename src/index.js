/* eslint-disable import/extensions */
import Server from './server.js';
import config from './config/configurations.js';
import schema from './module/index.js';

const server = new Server(config);
(() => {
  server.bootstrap().setupApollo(schema);
})();