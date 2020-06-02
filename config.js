const path = require('path');

module.exports = {
    db: path.join(__dirname, 'db.json'),
    static: {
        upload: 'upload'
    },
    port: 3005,
    imagesDir: 'images'
}