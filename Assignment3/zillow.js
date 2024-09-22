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
    response.status(200).send('Root endpoint')
})


app.get('/v1/zillow/zestimate', (request, response) => {
    // After much testing, I found out that you can send in
    // Multiple paramters named the same thing
    // i.e you can pass in 2 sqft and it will only take the first 
    const keys = lo.keys(request.query)
    var values = lo.values(request.query)

    const expectedKeys = ['sqft', 'bed', 'bath']
   
    // Check if we have all of the parameters
  
    var isValidKeys = validateKeys(keys, expectedKeys);
    if(!isValidKeys){
        response.sendStatus(404)
        console.log("Failed at the keys")
        return
    }

    // Check if all the values are integers
    var isAllValidInts = allValidIntegers(values)
    if(!isAllValidInts){
        response.sendStatus(404)
        console.log("Failed at the ints")
        return   
    }
    // Used the following as a resource... I just forgot to add the return
    // https://www.geeksforgeeks.org/lodash-_-reduce-method/
    values = lo.map(values, v => {return lo.parseInt(v);})
    zestimate = lo.reduce(values, (total, v) => {return total *= v} ) * 10
    response.status(200).send({"zestimate" : zestimate})
})

app.get('/v1/zillow/houses', (request, response) => {

    const keys = lo.keys(request.query)
    const values = lo.values(request.query)
    const cities = lo.map(houses, 'city')
    const searchCity = values[0]

    if(keys.length >= 2){
        console.log(`too many args`)
        response.sendStatus(404)
        return
    }
    
    //THIS PART CORRESPONDS WITH THE DOC, BUT DOES NOT CORRESPOND WITH THE VIDEO... SO COMMENT THIS AND UNCOMMENT THE FOLLOWING COMMENTED BLOCK IF YOU WANT IT TO WORK WITH THE DOC
    if(keys.length == 1 && keys[0] != 'city'){
        response.sendStatus(404)
        console.log('mispelled param')
        return
    }  
    // THIS PART IS IF YOU WANTED US TO RETURN ALL OF THE HOUSES LIKE IN THE VIDEO'S DOC, BUT AS I HAVE IT, IT MATCHES THE DOCUMENT
    // if(keys.length === 0){
    //     response.status(200).send(houses)
    //     return
    // }
    // if(keys[0] != 'city'){
    //     response.sendStatus(404)
    //     console.log('mispelled param')
    //     return
    // }



    
    var resultHouses = lo.filter(houses, (house) =>{return house.city === searchCity})

    response.status(200).send(resultHouses)


})

app.get('/v1/zillow/prices', (request, response) => {

    var keys = lo.keys(request.query) 
    var values = lo.values(request.query) 

    if(keys.length != 1){
        console.log("One and only one param needed")
        response.sendStatus(404)
        return
    }

    if(keys[0] != 'usd'){
        console.log('Param must be "usd"')
        // FOR MATCHING THE VIDEO, THE FOLLOWING COMMENTED CODE WOULD REPLACE response.sendStatus(404)
        // response.status(404).send('usd param required')
        response.sendStatus(404)
        return
    }
    
    if(!isValidNumber(values[0])){
        console.log('The price must be a number and > 0')
        response.sendStatus(404)
        return
    }

    const price = values[0]
    const housesUnderPrice = lo.filter(houses, (house) => {return house.price <= price} )

    response.status(200).send(housesUnderPrice)



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
// Refactored hard
function allValidIntegers(values){
    isValid = true;
    values.forEach(v =>{

        var number = Number(v)
  
        if(Number.isNaN(number)){
            console.log("Param value is not a number ")
            isValid = false
            return
        }

        if(!Number.isInteger(number) || number < 0){
            console.log("Param value is not an integer")
            isValid = false
            return
        }

        // // See if the each character is a number or not
        // var testVal = v.split("")
        // var foundNonInt = lo.some(testVal, s => !lo.isInteger(lo.parseInt(s)))
        // if(foundNonInt){
        //     console.log("Param value is not an int ")
        //     isValid = false
        //     return
        // }
        // var val = lo.parseInt(v)
    
        // // >=0 because negative sqft or bathrooms or price makes no sense 
        // if(!lo.isInteger(val) || val < 0 || lo.isNaN(val)){
        //     console.log("Not a integer or under 0")
        //     isValid = false;
        // }
    })
    return isValid;

}

function isValidNumber(value){
   return !Number.isNaN(Number(value)) || value < 0

}

// Check to make sure about ports
if(process.argv.length != 3){
    console.log("Please provide the port number")
    return
}

const port = process.argv[2]
if(!allValidIntegers([port])){
    console.log("Port number must be an integer")
    return
}

console.log(`creating a new server at port localhost:${port}`)
app.listen(port)

