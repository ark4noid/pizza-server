module.exports = function(router){
    router.post('/comments', (req, res, next) => {
        req.body.created = new Date().toUTCString();
        // TODO: a~nadir id de usuario actual
        next();
    });
}