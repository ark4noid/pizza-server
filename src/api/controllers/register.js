module.exports = (api) => {
    api.post('/register', (req, res, next) => {
        // TODO: modificar la contrasena del body usando bcrypt
        // TODO: utilizar req.$.dbManager para grabar el usuario
        // req.$.dbManager.create('users', body)
    })
}