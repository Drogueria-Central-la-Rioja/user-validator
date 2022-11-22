const { Domicilios } = require('../../models/index');

module.exports = {
    async create(data, transaction) {
        return await Domicilios.create(data, {
            transaction
        });
    }
}