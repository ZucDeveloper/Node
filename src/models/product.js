'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // Schema cria um Id de cada produto dinamicamente
  // Titulo tipo string, 
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type:String,
    required: [true, 'O Slug é obrigatório'],
    trim: true,
    index: true,
    unique: true
  },
  description: {
    type: String,
    required: true
   
  },
  price: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  tags: [{
    type: String,
    required: true
  }]
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


module.exports = mongoose.model('Product', schema);

