module.exports = (api) => {
    api.post('/login', (req, res) => {
        const jwt = req.$.jwt
        // TODO: comprobar que user y pass son correctos
        // req.$.dbManger.get('users', {find: {email, password: bcrypt(body.password)}})

        // TODO: crear tokens de refresco y de auth y devolverlos
        // en una cookie y en el body respectivamente
    })
}