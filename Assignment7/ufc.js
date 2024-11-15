const fighters = require('./fighters.json');
const express = require('express')

const {graphqlHTTP } = require('express-graphql')
const {buildSchema} = require('graphql')

function getFighter (args) {
    for(const person of fighters){
        if(person.Name.toLowerCase() === args.name.toLowerCase()){
            return person;
        }
    }
    return null;
}

function getFighters(args){
    return fighters.forEach(element => {
        return element.WeightClass.toLowerCase() === args.currentWeightClass.toLowerCase()
    });
}

var schema = buildSchema(`
    type Query {
        fighter(name :String!): Fighter
        fighters(weightClass: String): [Fighter]
    },

    type Fighter{
        name: String!
        nickName: String!
        wins: Int!
        losses: Int!
        currentWeightClass: String!
        location: String!
    }
    `)

    var root = {
        fighter : getFighter,
        fighters : getFighters
    }

    const app = express()
   app.use("/test", graphqlHTTP({ // Updated function name
        schema: schema,
        rootValue: root,
        graphiql: true
   }))
    // Question to Chat GPT 
//     app.use("/test", express_graphql({
//         schema:schema,
//         rootValue: root,
//         graphiql:true
//     }))
// it says     express_graphql not a function

// Response: 
// The error occurs because express-graphql was updated, and its API has changed. Instead of using express_graphql, you now need to use the named export graphqlHTTP from the express-graphql package.

// Here's the corrected code:

// Updated Code
// javascript
// Copy code
// const fighters = require('./fighters.json');
// const express = require('express');

// const { graphqlHTTP } = require('express-graphql'); // Updated import
// const { buildSchema } = require('graphql');
// ...
// app.use("/test", graphqlHTTP({ // Updated function name
// schema: schema,
// rootValue: root,
// graphiql: true
// }));


    app.listen(3000, ()=> {console.log("listening to localhost://3000")})