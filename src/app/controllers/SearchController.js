class SearchController {

    index(req, res) {
        res.render('search');
    }
    show(req, res, next){
        Pokemon.findOne({ name: req.params.name}, { city: req.params.city}).lean()
        .then(pokemons =>{
            res.render('pokemons/searchdetail', { pokemons})

        })                                                                                                                                                                                                                                                                                                              
        .catch(next)
    }

    
}

module.exports = new SearchController;
