module.exports = function (api) {
    api.route('/comments')
        .post((req, res, next) => {
            req.body.created = new Date().toUTCString();
            // TODO: a~nadir id de usuario actual
            next();
        });
}