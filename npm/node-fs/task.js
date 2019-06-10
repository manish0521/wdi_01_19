// * 1. create an event 'createFile' which will create file '{yourName}.txt' with current date and time inside
// * 2. create an event 'readFile'wich in 10 sec will read '{yourName}.txt' and print out content to console
// * 3. create an event 'updateFile' wich in 10 sec will update '{yourName}.txt' with string 'updated' and print out content to console
// * 4. create an event 'deleteFile' wich in 10 sec will delete '{yourName}.txt' and send email with text 'File {fileName} DELETED!'
//  yuri.shkoda@codeimmersives.com



// * 1. create an event 'createFile' which will create file '{yourName}.txt' with current date and time inside

const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)

const task = {}

task.baseDir = path.join(__dirname, './task')

/**
 * Create
 */

 task.create = (file, data) => {
     fs.open(`${task.baseDir}/${file}.txt`, 'wx', (error, identifier) => {

            if (!error && identifier) {
                let jsonArray = []
                jsonArray.push(data)

                let stringData = JSON.stringify(jsonArray, null, 9)

                fs.writeFile(identifier, stringData, (err) =>{

                    if (!err){
                        fs.close(identifier, (err) =>{
                            if (err) console.log(err)
                            else console.log("no error");
                            
                        
                        })
                    } else {
                        console.log(err)
                    }

                })

            }
     })
 }

task.create('manish', {'Date':'06/06/2019'})



// * 2. create an event 'readFile'wich in 10 sec will read '{yourName}.txt' and print out content to console

task.read = (file) => {
    fs.readFile(`${task.baseDir}/${ file }.txt`, 'utf8', (error, data) => {

        if (error) throw error
        console.log(data)
        
        })
        setTimeout((readFile) => {
            task.update()
        }, 3000);
}

task.read('manish')


// * 3. create an event 'updateFile' wich in 10 sec will update '{yourName}.txt' with string 'updated' and print out content to console

task.update = (file, data) => {
    // readfile retun promise
    readFile (`${task.baseDir}/${ file }.txt`, 'utf8')

    .then(newStream => {
        // change string to JS object
        let newData = JSON.parse(newStream)

        // push our updates to array
        newData.push(data)

        // return data as string
        return JSON.stringify(newData, null, 3)
    })
        .then(finalData => {

            // replace the content in the file with update

            fs.truncate(`${task.baseDir}/${ file }.txt`, (error) => {
                
                if (!error) {
                    fs.writeFile(`${task.baseDir}/${ file }.txt`, finalData, (err) => {
                        if (err) return err 
                    })
                
                } else {
                    return error 
                }
                

            })

        })
        setTimeout((readFile) => {
            task.delete()
        }, 3000);
}

    task.update('manish', {'updated':""})


// 4

    task.delete = (file) => {
    

        fs.unlink(`${task.baseDir}/${ file }.txt`, (err) => {
    
            if (!err) console.log("deleted!")

            else return err
            
            })
            
            setTimeout((readFile) => {
                transporter.sendMail()
            }, 3000);

    }
task.delete('manish')


// email
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
    to: 'yuri.shkoda@codeimmersives.com',
    subject: 'Sending Email using Node.js',
    text: 'File {manish.txt} DELETED!'
}

transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error)

    else console.log(`Email sent: ${info.response}` )

})

