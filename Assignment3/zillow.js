const express = require('express')
const lo = require('lodash')

var app = express()

app.get('/', (request, response) => {
    response.send('Root endpoint')
})

app.get('/v1/zillow/zestimate/', (request, response) => {
    // response.send(request)

    const keys = lo.keys(request.query)
    const values = lo.values(request.query)

    const expectedKeys = ['sqft', 'bed', 'bath']
   
    // Check if we have all of the parameters
    var allSatisfied = true;
    keys.forEach(k =>{
        if(!expectedKeys.includes(k)){
            allSatisfied = false;
            console.log("Does not include all Params")
        }
    })
    if(!allSatisfied){
        response.sendStatus(400)
        return
    }

    // Check if all the values are integers
    values.forEach(v =>{
        if(!lo.isInteger(lo.parseInt(v))){
            allSatisfied = false;
            console.log("Not a integer")
            return
        }
    })

    if(!allSatisfied){
        response.sendStatus(400)
        return   
    }


    response.send('This is h')
})

console.log("creating a new server at port 3000")
app.listen(3000)

