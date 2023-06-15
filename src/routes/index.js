const searchRouter = require('./search')
const homeRouter = require('./home')

function route(app) {

  app.use('/search', searchRouter);
  app.use('/home', homeRouter)
}

module.exports = route;