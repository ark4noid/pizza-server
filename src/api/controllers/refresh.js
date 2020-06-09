module.exports = (api) => {
    api.post('/refresh', (req, res) => {
        // TODO: comprobar que el token de refresco sea valido
        // TODO: emitir un nuevo token de auth
    });
}