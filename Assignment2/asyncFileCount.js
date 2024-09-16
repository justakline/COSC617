var fs = require('fs')

if(process.argv.length < 4){
    console.log("Error! Not enough args, make sure you have the path and the extention file type as args")
    return
}

if(process.argv.length > 4){
    console.log("Error! Too many args, make sure you have the path and the extention file type as args ONLY ")
    return
}


const fileName = process.argv[2]
const extention = process.argv[3]

if(!extention.includes(".")){
    console.log("Error! Dont forget the '.' for the file extention")
    return
}

// Used Chat for the function that gets directories... I thought it would be like python with the os library
// Asked "how to get a directory in js node using fs" responsed with s.readdir(directoryPath, (err, files) => {} + some other non needed stuff
fs.readdir(fileName, (error, data) => {
    if(error){
        console.log("Error! File probably not found or the wrong name")
        console.log("If the folder name has any spaces, put the path in quotes")
        return
    }

    var filteredData = []
    for (item of data){
        // Skip anything that does not inlcude a . like folders
        if(!item.includes(".")){
            continue
        }
        
        // Get the file extenion and compare 
        itemSplit = item.split(".")
        ext = "." +itemSplit.at(itemSplit.length-1)
        if(ext == extention){
            filteredData.push(item)
        }
    }

    console.log("The number of files with the " + extention + " extention in " + fileName + " is " + filteredData.length)

})

