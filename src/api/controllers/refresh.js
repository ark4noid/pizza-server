module.exports = (api) => {
    api.post('/refresh', (req, res) => {
        const { jwt, config } = req.$;
        const {
            refreshCookie,
            refreshSecret,
            authSecret,
            algorithm,
            authTTL
        } = config.authentication;
        const refreshToken = req.cookies[refreshCookie];

        // si no hay token
        if (!refreshToken) {
            res.status(401).end();
            return;
        }

        // TODO: comprobar que el token de refresco sea valido
        let payload;
        try {
            payload = await jwt.verify(refreshToken, refreshSecret);
        } catch (err) {
            // si el token es invalido
            res.status(401).end();
            return;
        }
        const user = payload.user;
        // TODO: emitir un nuevo token de auth
        const authToken = await jwt.sign({ user }, authSecret, {
            algorithm,
            expiresIn: authTTL
        });

        res.json({token: authToken});
    });
}