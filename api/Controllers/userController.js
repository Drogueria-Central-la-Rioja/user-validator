module.exports = {
    async getUsers(req, res){
        res.status(200).json({
            status: 200,
            message: 'Trae usuarios'
        });
    }
}