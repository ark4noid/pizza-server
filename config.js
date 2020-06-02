const path = require('path');

module.exports = {
    db: path.join(__dirname, 'db.json'),
    static: {
        upload: 'upload'
    },
    port: process.env.PORT || 3005,
    imagesDir: 'images'
}