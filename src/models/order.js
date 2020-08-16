'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // Schema cria um cliente  
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  number: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'done'],
    default: 'created'
  },
  items: [{
    quatity: {
      type: Number,
      required: true,
      default: 1
    },
    price: {
      type: Number,
      required: true,   
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }    
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


module.exports = mongoose.model('Order', schema);