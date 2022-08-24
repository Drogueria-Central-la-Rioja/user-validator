const jwt = require('jsonwebtoken');

module.exports = {
    async generateJWT(user_id, user_name) {

        const payload = { user_id, user_name };
        return new Promise((resolve, reject) =>{
            jwt.sign(payload, process.env.SECRET_JWT_SEED, {
                expiresIn: '1h'
            }, (err, token) =>{
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(token);
                }
            });
        });
    },

    async verifyJWT(token) {
        let data = null;
        try {
            data = jwt.verify(token, process.env.SECRET_JWT_SEED);
        } catch (error) {
            console.log(error);
        }
        return data;
    }
}