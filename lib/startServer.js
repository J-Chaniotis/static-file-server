'use strict';
const https = require('https');
const http = require('http');
const express = require('express');
const fs = require('fs');

module.exports = (config) => {
    const httpsApp = express();

    https.createServer({
        key: fs.readFileSync(config.key),
        cert: fs.readFileSync(config.cert)
    }, httpsApp).listen(config.httpsPort);

    httpsApp.use(express.static(config.webRoot));


    const httpApp = express();
    http.createServer(httpApp).listen(config.httpPort);

    httpApp.use((req, res, next) => {
        return req.secure ? next() : res.redirect(`https://${req.hostname}:${config.httpsPort}${req.originalUrl}`);
    });


};