const bodyParser = require('body-parser');

module.exports = {
    before: [
        bodyParser.urlencoded({ extended: false}),
        bodyParser.json()
    ],
    after: [
        require('./error')
    ]
};