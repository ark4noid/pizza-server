const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsGate = require('cors-gate');
const controllers = require('./controllers');
const {error, provider, auth} = require('./middlewares');
const jwt = require( './jwt');

function create(dbManager, config){
    const api = express.Router();
    api.use(bodyParser.json());
    api.use(cookieParser());
    // fallback al referrer
    api.use(corsGate.originFallbackToReferrer());
    // habilitar cors
    api.use(cors({
        credentials: true,
        origin: config.allowedOrigins
    }))
    // habilitar csrf usando el origin y el referrer
    api.use(corsGate({
        strict: true, // si no hay origin ni referrer devolvera un 403
        allowSafe: false, // si esta a true y strict esta a true permitira get y head sin origin
        origin: config.origin // el origin de nuestro servidor para poder aceptar las peticiones desdde el mismo origen
    }))
    api.use(provider({dbManager,jwt,config}));
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