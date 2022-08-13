const bcrypt = require('bcryptjs')

module.exports = {
    async encryptData(value) {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(value, salt);
    },

    async compare(encripted_value, value) {
        return bcrypt.compareSync(encripted_value, value);
    }
}