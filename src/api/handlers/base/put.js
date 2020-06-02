module.exports = function(router){
    router.put('*', (req, res) => {
        const resource = req.$.dbManager.update(req.path, req.body);
        res.json(resource).end();
    });
}