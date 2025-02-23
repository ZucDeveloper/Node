'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // Schema cria um cliente
  name: {
    type: String,
    required: true
  },
  email: {
    type:String,
    required: true
  },
  password: {
    type: String,
    required: true   
  },
  roles: [{
    type: String,
    required: true,    
    enum: ['user', 'admin'],
    default: 'user'
  }],
});

// Modelo de saida deste documento
// {
//   "title": "titulo",
//   "description": "xpto",
//   slug...

//   "tags": [
//     "teste", "123", "Pessoas"
//   ]
// }


module.exports = mongoose.model('Customer', schema);

