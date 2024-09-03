

// Edge case but not ncessary
// if(process.argv.length <= 2){
//     console.error('not enough args')
//     return
// }
const potentialNumbers = process.argv.slice(2)

// Used chatGPT to help figure out how to see if an element is an actual number or not
const result = potentialNumbers.filter(element => {
    return !isNaN(Number(element))
});


// Filter out the odds
let evenNumbers = []
for(num of result){
    if(num % 2 == 0){
        evenNumbers.push(num)

    }
}

console.log("The array contains " + evenNumbers)
console.log(`The length of the array is ${evenNumbers.length}`)