const fs = require('fs')
const lo = require('lodash')

// Used chat to explain all of the lo functions in a sussinct way
// "Asked what are the key functions in LoDash and what do they do"
// It responded with a list of them, each one with general parameters, and a quick explantion... around 20 different functions

if(process.argv.length < 3){
    console.log("Error! Not enough args, make sure you have the path ")
    return
}

if(process.argv.length > 3){
    console.log("Error! Too many args, make sure you have the path ONLY ")
    return
}

const fileName = process.argv[2]
var j;
 fs.readFile(fileName,(error, data)=> {

    if(error){
        console.log("Error! File not found")
        return
    }

    // Used chat to diagnose why data.toJSON was giving a buffer for all of the items
    // "Why does data.toJSON give a buffer object and not a JSON object" ... it respponded mentioning that I probably wanted JSON.parse instead
    j = JSON.parse(data)
    console.log('Part 1')
    array = lo.map( j, 'username')
    console.log(array)
   
    console.log('\n\nPart 2')
    console.log(lo.groupBy(j, "username"))
    
    console.log('\n\nPart 3')
    console.log(lo.keys(lo.groupBy(j, "username")))




    console.log('\n\nPart 4 ')
    let sorted = lo.sortBy(j, "username")
    console.log(sorted)
    
})

