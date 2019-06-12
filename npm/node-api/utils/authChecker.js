function authChecker(req, res, next) {
    userNameChecker(req);
    emailChecker(req);
    passwordChecker(req);

    next();
}

function userNameChecker(userName) {
    userName.check('username').notEmpty().withMessage('Please enter as username').isLength({min: 3, max: 15}).withMessage('Username must be between 3 and 15 charachters').blacklist(/<>\//)
}

function emailChecker(email) {
    email.check('email').isEmail().withMessage('Please enter an email')
}

function passwordChecker(password) {
    password.check('password').notEmpty().withMessage('Please enter valid password')

    password.checkBody('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d`~!@#$%^&*()_+]{5,10}$/).withMessage('Min 5 and Max 10 Characters, at least one uppercase letter, one lowercase letter, one number and one special character')

    password.checkBody('password2').notEmpty().withMessage('Confirmed password can not be empty').equals(password.body.password).withMessage('Password must match')
}

module.exports = authChecker

