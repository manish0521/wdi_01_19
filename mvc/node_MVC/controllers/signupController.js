const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {
    checkExistEmail: (req, res, next) => {
        user.findOne({email:req.body.email}, function (error, user) {
            if(error){
                res.status(400).json({
                    confirmation:'failure',
                    message: error
                    
                })
            }
            if (user) {
                // 409 indicates a request conflict with the current server
                res.status(409).json({
                    confirmation:'failure',
                    message: 'Email already exists'
                })
            } else {
                next()

                return
            }
        })
    },

    checkExistUsername: (req, res, next) => {
        // write
        username.findOne({username:req.body.username}, function (error, user) {
            if(error){
                res.status(400).json({
                    confirmation:'failure',
                    message: error
                    
                })
            }
            if (user) {
                // 409 indicates a request conflict with the current server
                res.status(409).json({
                    confirmation:'failure',
                    message: 'Username already exists'
                })
            } else {
                next()

                return
            }
        })

    },
    
    createUser: (req, res,) => {
        bcrypt.genSalt(10, function (error, salt) {
            if (error) {
                res.status(400).json({
                    confirmation: 'failure',
                    message: error
                })
            } 

            bcrypt.hash(req.body.password,salt, function (error, hash) {
                if (error){
                    reres.status(400).json({
                        confirmation: 'failure',
                        message: error
                    })
                } else {
                    let newUser = new User({
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                      
                    })

                    newUser.save(function (error, user) {
                        if (error){
                            reres.status(400).json({
                                confirmation: 'failure',
                                message: error
                            })
                        } else {
                            res.json ({
                                confirmation: 'success',
                                payload: user
                            })
                        }
                    })
                } 
            })
        })
    }
}
