"use strict";

require("dotenv").config();

const Hapi = require("hapi");
const server = exports.server = global.server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost"
});

const logger = require("./src/config/log");
const mongo = require("./src/config/mongo");
const auth = require('./src/config/auth');
const router = require("./src/router");

(async () => {
    await server.register(logger);
    await server.register(mongo);
    await server.register(auth);
    await server.register(router);
    await server.start();

    server.log('info', `Server running at: ${server.info.host}:${server.info.port}`);
})();