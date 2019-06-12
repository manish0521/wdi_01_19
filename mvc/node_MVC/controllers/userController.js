const user = require('../models/User')

module.exports = {
    findAllUsers: (params, callback) => {

        user.find(params, (error, users) => {
            if (error) callback(error, null)
            else callback(null, users)
        })
    }
    
}