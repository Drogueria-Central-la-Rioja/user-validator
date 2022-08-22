const cron = require('node-cron');
const { sequelize, Tokens_blacklist } = require('../../models/index');
const { Op } = require('sequelize');

module.exports = {
    executeCrons() {

        // Delete expired tokens in blacklist
        cron.schedule('* * 22 * * *', async () => {
            try {
                await sequelize.transaction( async (t) => {
                    const deleted = await Tokens_blacklist.destroy({
                        where: { 
                            expireIn: { 
                                [Op.lt]: new Date() // today
                            } 
                        }
                    });
                    console.log('Deleted tokens: ' + deleted);
                });   
            } catch (error) {
                console.log(error);
            }
        });
    }
}


