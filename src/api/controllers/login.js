const bcrypt = require('bcrypt');

module.exports = (api) => {
    api.post('/login', async (req, res) => {
        // const jwt = req.$.jwt
        // const dbManager = req.$.dbManager
        const { jwt, dbManager, config } = req.$
        //    buscamos el usuario en la bbdd por el email que llega en el body de la peticion.
        const user = await dbManager.get('users', { find: { email: req.body.email } })
        if (!user) {
            res.status(401).end();
            return;
        }
        // TODO: comprobar que user y pass son correctos
        // req.$.dbManger.get('users', {find: {email, password: bcrypt(body.password)}})
        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isValidPassword) {
            res.status(401).end();
            return;
        }
        // TODO: crear tokens de refresco y de auth y devolverlos
        // en una cookie y en el body respectivamente
        const userModel = {
            ...user,
            password: undefined
        };
        const {
             authSecret, authTTL, algorithm,
             refreshCookie, refreshSecret, refreshTTL
        } = config.authentication;
        
        const authToken = await jwt.sign(
            { user: userModel },
            authSecret,
            { algorithm, expiresIn: authTTL }
        );
        //console.log(authtoken) para hacer postman y jwt.io
        const refreshToken = await jwt.sign(
            { user: userModel },
            refreshSecret,
            { algorithm, expiresIn: refreshTTL}
        );
        //res.cookie("name", "value"),
        res
            .cookie(refreshCookie, refreshToken, {
                httpOnly: true,
                maxAge: refreshTTL * 1000,
                sameOrigin: 'none',
                secure: config.protocol === 'https'
            })
            .json({ token: authToken })
            .status(200)
            .end();
    })
}