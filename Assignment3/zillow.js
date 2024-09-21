const express = require('express')
const lo = require('lodash')

var app = express()
var houses =  [
    { price: 240000, city: "baltimore" },
    { price: 300000, city: "austin" },
    { price: 400000, city: "austin" },
    { price: 1000000, city: "seattle" },
    { price: 325000, city: "baltimore" },
    { price: 550000, city: "seattle" },
    { price: 250000, city: "boston" }
];
// Root 
app.get('/', (request, response) => {
    response.send('Root endpoint')
})

// 
app.get('/v1/zillow/zestimate/', (request, response) => {
    // After much testing, I found out that you can send in
    // Multiple paramters named the same thing
    // i.e you can pass in 2 sqft and it will only take the first 
    const keys = lo.keys(request.query)
    var values = lo.values(request.query)
    console.log(values)

    const expectedKeys = ['sqft', 'bed', 'bath']
   
    // Check if we have all of the parameters
  
    var isValidKeys = validateKeys(keys, expectedKeys);
    if(!isValidKeys){
        response.sendStatus(400)
        console.log("Failed at the keys")
        return
    }

    // Check if all the values are integers
    var isAllValidInts = allValidIntegers(values)
    if(!isAllValidInts){
        response.sendStatus(400)
        console.log("Failed at the ints")
        return   
    }
    // Used the following as a resource... I just forgot to add the return
    // https://www.geeksforgeeks.org/lodash-_-reduce-method/
    values = lo.map(values, v => {return lo.parseInt(v);})
    zestimate = lo.reduce(values, (total, v) => {return total *= v} ) * 10
    response.send({"zestimate" : zestimate})
})

app.get('/v1/zillow/houses/', (request, response) => {

    const keys = lo.keys(request.query)
    const values = lo.values(request.query)
    const cities = lo.map(houses, 'city')
    const searchCity = values[0]

    if(keys.length >= 2){
        console.log(`too many args`)
        response.sendStatus(400)
        return
    }
    if(keys.length == 1 && keys[0] != 'location'){
        response.sendStatus(400)
        console.log('mispelled param')
        return
    }

    if(keys.length === 0 || !cities.includes(searchCity)){
        response.send([])
        console.log(`city not found or no args`)
        return
    }

    
    var resultHouses = lo.filter(houses, (house) =>{return house.city === searchCity})

    response.send(resultHouses)


})


function validateKeys(keys, expectedKeys) {

    var isValid = true;
    keys.forEach(k =>{
        if(!expectedKeys.includes(k)){
            console.log("Does not include all Params or wrong ones")
            isValid = false;
        }

    })
    return isValid && keys.length === expectedKeys.length
}
// Check for if all are valid ints
function allValidIntegers(values){
    isValid = true;
    values.forEach(v =>{

        // See if the each character is a number or not
        var testVal = v.split("")
        var foundNonInt = lo.some(testVal, s => !lo.isInteger(lo.parseInt(s)))
        if(foundNonInt){
            console.log("Param value is not an int ")
            isValid = false
            return
        }
        var val = lo.parseInt(v)
    
        // >=0 because negative sqft or bathrooms makes no sense 
        console.log(val)
        if(!lo.isInteger(val) || val < 0 || lo.isNaN(val)){
            console.log("Not a integer")
            isValid = false;
        }
    })
    return isValid;

}

console.log("creating a new server at port 3000")
app.listen(3000)

