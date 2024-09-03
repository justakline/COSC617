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
        console.error("Pass in a valid file location/file")
        return err
    }

    const validWords = ['towson', 'cis', 'web', 'development']
    const lines = data.toString().split('\n')
    
    var count =0

    // Split into lines, then into words, then make sure the words are valid
    for(line of lines){
        words = line.split(' ')
        for (word of words){
            if (validWords.includes(word.toLowerCase().trim()) ){
                count += 1
            }
        }
    }
    
    console.log("The total number of occurences is " + count)



})