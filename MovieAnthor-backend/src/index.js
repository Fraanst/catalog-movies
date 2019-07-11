'use strict';

const server = require('./server');

server.init().then(s =>
    server.start()
);