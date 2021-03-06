const path = require('path');

module.exports = {
    db: path.join(__dirname, 'db.json'),
    static: {
        upload: 'upload'
    },
    protocol: process.env.PROTOCOL || 'http',
    port: process.env.PORT || 3005,
    origin: process.env.ORIGIN || 'http://localhost:3005',
    imagesDir: 'images',
    authentication: {
        algorithm: 'HS512',
        authSecret: process.env.AUTH_SECRET || 'secret1',
        authTTL: 5 * 60,
        refreshSecret: process.env.REFRESH_SECRET || 'secret2',
        refreshTTL: 30 * 24 * 60 * 60,
        refreshCookie: '_hsrfr'
    },
    allowedOrigins:  ['https://www.google.es', 'http://localhost:3000']
}