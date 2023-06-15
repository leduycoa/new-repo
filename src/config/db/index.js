const mongoose = require('mongoose');
mongoose.set("strictQuery", false)

async function connect() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/POKEMON-GO');
            console.log('connect susccesfully!');
        
        } catch (error){
            console.log('connect failure!')   
    }
}

module.exports = { connect };