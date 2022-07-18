const bcrypt = require('bcryptjs');
const { sequelize } = require('../../models/index');
const { invalidLoginCredentialsError } = require('../helpers/responses');
const userService = require('../Services/user.service');

module.exports = {

    async login(req, res){

        const { user_name, password } = req.body;
        try {
            await sequelize.transaction( async(t) =>{
                const user = await userService.getUserByName(user_name);

                if(user){
                    const matchPassword = bcrypt.compareSync(password, user.password);

                    if(!matchPassword){
                        return invalidLoginCredentialsError(res);
                    }

                    return res.json({msg: 'OK'});
                }else{
                    return invalidLoginCredentialsError(res);
                }
            });
        }catch(error){
            return res.json({msg: 'OK'});
        }
    }
}