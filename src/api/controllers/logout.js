module.exports = (api) => {
    api.post('/logout', (req, res) => {
        // TODO: eliminar la cookie de refresco
        const refreshCookie = req.$.config.authentication.refreshCookie
        res
            .clearCookie(refreshCookie, { 
                httpOnly: true,
                sameSite:'none',
                secure: config.protocol === 'https'
            })
            .status(204)
            .end();
    });
}