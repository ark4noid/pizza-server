const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const controllers = require('./controllers');
const {error, provider, auth} = require('./middlewares');

function create(dbManager, config){
    const api = express.Router();
    api.use(bodyParser.json());
    api.use(cookieParser());
    // fallback al referrer
    // habilitar cors
    // habilitar csrf usando el origin y el referrer
    api.use(provider({dbManager, config}));
    controllers.public.forEach((controller) => {
        controller(api);
    });
    api.use(auth);
    controllers.private.forEach((controller) => {
        controller(api);
    });
    api.use(error);
    return api;
}


module.exports = {create};