const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
  
const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: '+02:00',
  },
  logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => { // {force: true} reinitiale l'api rest 
    console.log('INIT DB')
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('pikachu', 10)
    .then(hash => 
      User.create({ 
        username: 'pikachu', 
        password: hash 
      }))
    .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, User
}