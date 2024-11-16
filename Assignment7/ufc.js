const express = require('express')

const {graphqlHTTP } = require('express-graphql')
const {buildSchema} = require('graphql')

//### I Allowed the queries to be non-case sensitive ###



function getFighter (args) {
    for(const person of fighters){
        if(person.Name.toLowerCase() === args.name.toLowerCase()){
            const fighter = {'name': person.Name, 'nickName': person.Nickname, 'wins' : person.Wins, 'losses': person.Losses, 'currentWeightClass' : person.WeightClass, 'location': person.FightingOutOf}
            return fighter;
        }
    }
    return null;
}

function getFighters(args){
    const filteredFighgters = fighters.filter(person => {
        return person.WeightClass.toLowerCase() === args.weightClass.toLowerCase()
    });

    const formattedFighters = filteredFighgters.map(person => {
      return {'name': person.Name, 'nickName': person.Nickname, 'wins' : person.Wins, 'losses': person.Losses, 'currentWeightClass' : person.WeightClass, 'location': person.FightingOutOf}
     
    })
    return formattedFighters
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


    // All of the fighters, luckily we have let keyword, so i can just place this down here instead of first thing
    let fighters =[
        {
          "Name": "Tuco Tokkos",
          "Nickname": "N/A",
          "Wins": 10,
          "Losses": 4,
          "Height_m": 1.93,
          "WeightClass": "Light Heavyweight",
          "FightingOutOf": "N/A, England"
        },
        {
          "Name": "Magomed Gadzhiyasulov",
          "Nickname": "MG",
          "Wins": 9,
          "Losses": 0,
          "Height_m": 1.88,
          "WeightClass": "Light Heavyweight",
          "FightingOutOf": "N/A, Bahrain"
        },
        {
          "Name": "Ivan Erslan",
          "Nickname": "N/A",
          "Wins": 14,
          "Losses": 4,
          "Height_m": 1.88,
          "WeightClass": "Light Heavyweight",
          "FightingOutOf": "N/A, Croatia"
        },
        {
          "Name": "Raffael Cerqueira",
          "Nickname": "The Lion",
          "Wins": 11,
          "Losses": 1,
          "Height_m": 1.91,
          "WeightClass": "Light Heavyweight",
          "FightingOutOf": "N/A, Brazil"
        },
        {
          "Name": "Brad Tavares",
          "Nickname": "N/A",
          "Wins": 20,
          "Losses": 10,
          "Height_m": 1.85,
          "WeightClass": "Middleweight",
          "FightingOutOf": "Las Vegas, NV"
        },
        {
          "Name": "Chris Weidman",
          "Nickname": "The All-American",
          "Wins": 16,
          "Losses": 7,
          "Height_m": 1.88,
          "WeightClass": "Middleweight",
          "FightingOutOf": "New York City, NY"
        },
        {
          "Name": "Robert Whittaker",
          "Nickname": "The Reaper",
          "Wins": 26,
          "Losses": 8,
          "Height_m": 1.83,
          "WeightClass": "Middleweight",
          "FightingOutOf": "Sydney, Australia"
        },
        {
          "Name": "Kelvin Gastelum",
          "Nickname": "N/A",
          "Wins": 19,
          "Losses": 9,
          "Height_m": 1.75,
          "WeightClass": "Middleweight",
          "FightingOutOf": "Yuma, AZ"
        },
        {
          "Name": "Sean Strickland",
          "Nickname": "Tarzan",
          "Wins": 29,
          "Losses": 6,
          "Height_m": 1.85,
          "WeightClass": "Middleweight",
          "FightingOutOf": "Newark, NJ"
        },
        {
          "Name": "Jared Cannonier",
          "Nickname": "Tha Killa Gorilla",
          "Wins": 17,
          "Losses": 8,
          "Height_m": 1.80,
          "WeightClass": "Middleweight",
          "FightingOutOf": "Las Vegas, NV"
        },
        {
          "Name": "Kamaru Usman",
          "Nickname": "The Nigerian Nightmare",
          "Wins": 21,
          "Losses": 4,
          "Height_m": 1.83,
          "WeightClass": "Middleweight",
          "FightingOutOf": "Auchi, Nigeria"
        },
        {
          "Name": "Rob Font",
          "Nickname": "N/A",
          "Wins": 21,
          "Losses": 8,
          "Height_m": 1.73,
          "WeightClass": "Bantamweight",
          "FightingOutOf": "Las Vegas, NV"
        },
        {
          "Name": "Marlon Vera",
          "Nickname": "Chito",
          "Wins": 23,
          "Losses": 10,
          "Height_m": 1.73,
          "WeightClass": "Bantamweight",
          "FightingOutOf": "Chone, Ecuador"
        },
        {
          "Name": "Henry Cejudo",
          "Nickname": "The Messenger",
          "Wins": 16,
          "Losses": 4,
          "Height_m": 1.63,
          "WeightClass": "Bantamweight",
          "FightingOutOf": "Phoenix, AZ"
        },
        {
          "Name": "Cody Garbrandt",
          "Nickname": "No Love",
          "Wins": 14,
          "Losses": 6,
          "Height_m": 1.70,
          "WeightClass": "Bantamweight",
          "FightingOutOf": "Las Vegas, NV"
        },
        {
          "Name": "Taylor Lapilus",
          "Nickname": "Double Impact",
          "Wins": 21,
          "Losses": 4,
          "Height_m": 1.68,
          "WeightClass": "Bantamweight",
          "FightingOutOf": "Paris, France"
        },
        {
          "Name": "Jéssica Andrade",
          "Nickname": "Bate Estaca",
          "Wins": 26,
          "Losses": 13,
          "Height_m": 1.57,
          "WeightClass": "Flyweight",
          "FightingOutOf": "Umuarama, Brazil"
        },
        {
          "Name": "Lauren Murphy",
          "Nickname": "Lucky",
          "Wins": 16,
          "Losses": 6,
          "Height_m": 1.70,
          "WeightClass": "Flyweight",
          "FightingOutOf": "Anchorage, AK"
        },
        {
          "Name": "Rose Namajunas",
          "Nickname": "Thug",
          "Wins": 13,
          "Losses": 7,
          "Height_m": 1.65,
          "WeightClass": "Flyweight",
          "FightingOutOf": "Milwaukee, WI"
        },
        {
          "Name": "Maryna Moroz",
          "Nickname": "The Iron Lady",
          "Wins": 11,
          "Losses": 6,
          "Height_m": 1.70,
          "WeightClass": "Flyweight",
          "FightingOutOf": "Vilnohirsk, Ukraine"
        }
      ]
      