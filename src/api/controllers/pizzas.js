const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const slash = require('slash');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { static, imagesDir } = req.$.config;
        cb(null, path.join(static.upload, imagesDir))
    },
    filename: (req, file, cb) => {
        const name = crypto.randomBytes(18).toString('hex')
        const extension = path.extname(file.originalname).split('.')[1];
        cb(null, name + '.' + extension);
    }
});

const upload = multer({ storage: storage });


module.exports = function (api) {
    api.route('/pizzas')
        .post(upload.single('img'), (req, res, next) => {
            req.body.img = slash(req.file.path.replace(req.$.config.static.upload, ''));
            next();
        });
}