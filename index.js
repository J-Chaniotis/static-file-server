'use strict';
// Fix path errors
process.chdir(__dirname);

const server = require('./lib/startServer');
const config = require('./config');

server(config);