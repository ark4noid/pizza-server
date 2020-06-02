const express = require('express');
const handlers = require('./handlers');
const middlewares = require('./middlewares');
function create(dbManager, config){
    const api = express.Router();
    api.use((req, res, next) => {
        req.$ = {dbManager, config};
        next();
    });
    api.use(middlewares.before);
    handlers.forEach((handler) => {
        handler(api);
    });
    api.use(middlewares.after);
    return api;
}


module.exports = {create};