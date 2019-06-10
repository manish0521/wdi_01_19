const nodemailer = require ('nodemailer')

let transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: 'manish.singh@codeimmersives.com',
        pass: 'manish21'
    }
})

let mailOptions = {
    from: 'manish.singh@codeimmersives.com',
    to: 'mangosingh21@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
}

transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error)

    else console.log(`Email sent: ${info.response}` )

})