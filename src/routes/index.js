const routes = require('express').Router()
const userRoutes = require('./userRoutes')

routes.get('/', (req, res) => {
    res.status(200).json({msg: "Welcome!"})
})

routes.use('/user', userRoutes)

module.exports = routes