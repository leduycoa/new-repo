const Pokemon = require('../models/Pokemon')

class HomeController {

    index(req, res, next) {
        Pokemon.find({}).lean()
            .then(pokemons => res.render('home',{pokemons}))
            .catch(next)
            
    }
    show(req, res, next){
        Pokemon.findOne({ name: req.params.name}).lean()
        .then(pokemons =>{
            res.render('pokemons/character', { pokemons})

        })
        .catch(next)
    }

 
}

module.exports = new HomeController;
