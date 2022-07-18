const bcrypt = require('bcryptjs')

module.exports = {
    async encryptData(value){
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(value, salt);
    }
}