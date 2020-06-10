module.exports = (dependencies) => (req, res, next) => {
    req.$ = dependencies; 
    next();
}