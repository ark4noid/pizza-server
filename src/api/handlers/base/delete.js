module.exports = function(router){
    router.delete('*', (req, res) => {
        req.$.dbManager.remove(req.path);
        res.status(204).end();
    });
}