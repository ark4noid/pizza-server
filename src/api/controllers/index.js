module.exports = {
    public: [
        require('./register'),
        require('./login'),
        require('./logout'),
        require('./refresh')
    ],
    private: [
        require('./pizzas'),
        require('./comments'),
        require('./base')
    ]
}