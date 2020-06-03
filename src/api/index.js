const express = require('express');
const controllers = require('./controllers');
const middlewares = require('./middlewares');
function create(dbManager, config){
    const api = express.Router();
    api.use((req, res, next) => {
        req.$ = {dbManager, config};
        next();
    });
    api.use(middlewares.before);
    controllers.forEach((controller) => {
        controller(api);
    });
    api.use(middlewares.after);
    return api;
}


module.exports = {create};