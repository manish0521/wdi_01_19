var express = require('express');
var router = express.Router();

let User = require('../models/User')

let signupController = require('../controllers/signupController')
let userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
    userController.findAllUsers({}, (err, users) => {
        if (err){
            reres.status(400).json({
                confirmation: 'failure',
                message: err
            })
        } else {
            res.json ({
                confirmation: 'success',
                message: users
            })
        }
    
    })
  
});

// Add emailExist and userExist checks to create user rout

router.post('/createuser', signupController.checkExistEmail, signupController.checkExistUsername, signupController.createUser)

module.exports = router;
