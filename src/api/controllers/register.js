const bcrypt = require('bcrypt');
module.exports = (api) => {
    api.post('/register', async (req, res, next) => {
        const { dbManager } = req.$;
        const { email, password, name } = req.body;
        // comprobar que no exista usuario con el email
        const userExists = await dbManager.get('users', {
            find: {
                email
            }
        });

        if(userExists){
            res.status(400).json({
                errors: {
                    email: 'An user already exists with that email'
                }
            });
            return;
        }
        // encriptar password
        const encryptedPassword = await bcrypt.hash(password, 10); // 10 rondas del algoritmo

        // crear usuario
        const user = await dbManager.create('users', {
            name,
            email,
            password: encryptedPassword
        });

        res.status(201).json({
            ...user,
            password: undefined
        });
    })
}