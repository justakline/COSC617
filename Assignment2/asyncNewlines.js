var fs = require('fs')


// Stop if the args are not good
if(process.argv.length > 3){
    console.log("Error! too many args, only add in the file path that you want to read")
    return
}
if(process.argv.length < 3){
    console.log("Error! not enough args, add in an file path")
    return
}


// Open the file and get the amount of lines, if there is an error then quit
count = 0
fileName = process.argv[2]
fs.readFile(fileName, (error, data) => {
    
    if(error){
        console.log("Error! Probably wrong file name or it is not in the folder")
        return
    }
   
    dataString = data.toString().split("\n")
    count = dataString.length
    console.log("The amount of new line characters is " + count)
})
