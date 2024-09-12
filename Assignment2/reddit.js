const fs = require('fs')
const { set } = require('lodash')
const lo = require('lodash')

// Used chat to explain all of the lo functions in a sussinct way
// Also for general syntax questions
if(process.argv.length < 3){
    console.log("not enough args, make sure you have the path ")
    return
}

if(process.argv.length > 3){
    console.log("too many args, make sure you have the path ONLY ")
    return
}

const fileName = process.argv[2]
var j;
 fs.readFile(fileName,(error, data)=> {

    if(error){
        console.error(error)
        return
    }

    // Used chat to diagnose why data.toJSON was giving a buffer for all of the items
    j = JSON.parse(data)
    console.log('Part 1 \n')
    let arrayOfUsers = lo.forEach(j, (item) => {
        console.log(lo.values(item)[0]);
    });
    
    console.log('\n\nPart 2 \n')
    console.log(lo.groupBy(j, "username"))
    
    console.log('\n\nPart 3 \n')
    console.log(lo.keys(lo.groupBy(j, "username")))




    console.log('\n\nPart 4 \n')
    let sorted = lo.sortBy(j, "username")
    console.log(sorted)
    
})

