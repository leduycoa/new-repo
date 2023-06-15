const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ObjectId = Schema.ObjectId;

const Pokemon = new Schema({
  
  name: String,
  dex: String,
  iv: String,
  Cp: String,
  lv: String,
  location: String,
  img: String,
  
});

module.exports = mongoose.model('Pokemon', Pokemon)