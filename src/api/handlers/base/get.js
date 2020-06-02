module.exports = function(router){
    router.get('*', (req, res) => {
        const resource = req.$.dbManager.get(req.path, {
            include: req.query.include && req.query.include.split(',')
        });
        if(!resource){
            res.status(404).end();
        } else {
            res.json(resource).end();
        }
    });
}