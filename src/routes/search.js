const express = require('express');
const router = express.Router();
const searchController = require('../app/controllers/SearchController')

// searchController.index

router.get('/:slug', searchController.show)
router.get('/', searchController.index)


module.exports = router;