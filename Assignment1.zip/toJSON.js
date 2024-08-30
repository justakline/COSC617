


var fs = require('fs')


if(process.argv.length > 3){
    console.error("Too many arguements, must only provide location of text file")
    return
}

if(process.argv.length < 3){
    console.error("Not enough arguements, please provide location of text file")
    return
}

const fileLocation = process.argv[2]

// used w3 schools example for general quick questions
fs.readFile(fileLocation, (err, data) => {

    if(err){
        console.error("there is no file named "+ fileLocation)
        return
    }
    const lines = data.toString().split("\n")
    
    if(lines.length < 3){
        console.error("Not enough lines in the file")
        return 
    }
    
    // Add the lines if it has the lines, then trim the white space
    var other = ''
    if(lines.length > 3){
        for (line of lines.slice(3)){
            if(line != ''){
                other += line + " "
            }
        }
        other = other.trimEnd().trimStart()
    }
    // If we found no lines filled with data then there is nothing
    other = other == ''? 'N/A' : other
    
    const json = {
                'fname': lines[0].split(" ")[0],
                'lname': lines[1].split(" ")[0],
                'location': lines[2].split(" ")[0],
                'other' : other
                }
    console.log(json)
    return json


})
