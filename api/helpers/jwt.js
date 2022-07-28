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
    }
}