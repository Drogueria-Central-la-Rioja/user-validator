const { sequelize, Tokens_blacklist } = require('../../models/index');
const {
 verifyJWT 
} = require('../helpers/jwt');

module.exports = {

    async addTokenToBlacklist(token) {
        try {
            const dataToken = await verifyJWT(token);
            if(dataToken != null) {
                let expireIn = new Date((await dataToken).exp * 1000);
                await sequelize.transaction( async (t) => {
                    await Tokens_blacklist.create({
                        token,
                        expireIn
                    }, {transaction: t});
                }); 
                return true;
            } else {
                return false;
            } 
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async tokenExistsInBlacklist(token) {
        let exist = false;
        const exist_in_blacklist = await Tokens_blacklist.findOne({
            where: { token }
        });
        if(exist_in_blacklist){
            exist = true;
        }
        return exist;
    }
}