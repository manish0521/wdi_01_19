const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)

const crud = {}

crud.baseDir = path.join(__dirname, './database')

/**
 * Create
 */

 crud.create = (file, data) => {
     fs.open(`${crud.baseDir}/${file}.json`, 'wx', (error, identifier) => {

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

crud.create('cars', {'name': 'Ford', 'price': '$3000'})



 /** 
*  r === open file for reading. An exception occurs if the file does not exist.
*  r+ === open file for reading and writing.
*  rs === open for reading in symchronous mode.
*  rs+ === open file for reading and writing n symchronous mode.
*   w === open for writing. the file is created (if does not exist) or truncated (if it exist)
*  wx === like 'w' but fails if path exists
*   w+ === open file for reading and writing.the file is created (if does not exist) or truncated (if it                    exist)
*  wx+ === like w+ but fails if path exists
*   a  === Open file for appending. The file is created if does not exist.
*   ax === lia 'a' but fails if exist
*   a+ === Open file for reading and appending. The file is created if does not exist
*   ax+ === alike a but fails if path exists
*/




//  READ


crud.read = (file) => {
    fs.readFile(`${crud.baseDir}/${ file }.json`, 'utf8', (error, data) => {

        if (error) throw error
        console.log(data)
        
        })

}

crud.read('cars')



//  UPDATE:

// crud.update = (file, data) => {

//     let stringData = `,${JSON.stringify(data)}`

//     fs.appendFile(`${crud.baseDir}/${ file }.json`, stringData, (error) => {

//         if (error) return error
//         console.log("Updated")
        
//         })

// }

// NEW UPDATE

crud.update = (file, data) => {
    // readfile retun promise
    readFile (`${crud.baseDir}/${ file }.json`, 'utf8')

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

            fs.truncate(`${crud.baseDir}/${ file }.json`, (error) => {
                
                if (!error) {
                    fs.writeFile(`${crud.baseDir}/${ file }.json`, finalData, (err) => {
                        if (err) return err 
                    })
                
                } else {
                    return error 
                }
                

            })

        })

}

crud.create('cars-updated', {name: 'Toyota', price: '$1500'})
crud.update('cars-updated', {'name': 'Tesla', 'price': '$20000'})
// crud.read('cars-updated')

/**
 * 1. read current content of life
 * 2. append updates
 * 3. truncate the file and replace
 */


// DELETE

crud.delete = (file) => {
    

        fs.unlink(`${crud.baseDir}/${ file }.json`, (err) => {
    
            if (!err) console.log("deleted!")

            else return err
            
            })
    
    }
crud.delete('cars-updated')


















