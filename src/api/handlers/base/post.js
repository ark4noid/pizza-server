module.exports = function(router){
    router.post('*', (req, res) => {
        const resource = req.$.dbManager.create(req.path, req.body);
        res.status(201).json(resource).end();
    });
}