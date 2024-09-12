var fs = require('fs')

if(process.argv.length < 4){
    console.log("not enough args, make sure you have the path and the extention file type as args")
    return
}

if(process.argv.length > 4){
    console.log("too many args, make sure you have the path and the extention file type as args ONLY ")
    return
}


const fileName = process.argv[2]
const extention = process.argv[3]

// Used Chat for the function that gets directories... I thought it would be like python with the os library
fs.readdir(fileName, (error, data) => {
    if(error){
        console.log(error)
        console.log("File probably not found or the wrong name")
        console.log("If the folder name has any spaces, but the path in quotes")
        return
    }
    console.log(data)

    var filteredData = []
    for (item of data){
        // Skip anything that does not inlcude a .
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

    console.log(filteredData)

})

