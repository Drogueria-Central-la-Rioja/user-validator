const {
 generateJWT
} = require('../helpers/jwt');
const {
 invalidLoginCredentialsError,
 internalServerError,
 transactionExecutedSuccessfully,
 invalidTokenError
} = require('../helpers/responses');
const authService = require('../Services/auth.service');
const userService = require('../Services/user.service');
const encryption = require('../Utils/encryption');

module.exports = {

    async login(req, res) {

        const { username, password } = req.body;
        try {
            const user = await userService.getByName(username);

            if(user){
                if(! await encryption.compare(password, user.password)){
                    return invalidLoginCredentialsError(res);
                }
                
                const token_auth = await generateJWT(user.id, user.name);
                return res.json({msg: 'Login exitoso', token: token_auth});
            }else{
                return invalidLoginCredentialsError(res);
            }
        }catch(error){
            console.log(error)
            return internalServerError(res, error);
        }
    },

    async logout(req, res) {
        try {
            const { token } = req.body;
            if(await authService.addTokenToBlacklist(token)) {
                return transactionExecutedSuccessfully(res);
            } else {
                return invalidTokenError(res, 'No se pudo validar el token enviado');
            }
        } catch (error) {
            console.log(error);
            return internalServerError(res, error);
        }
    },
}