const routes = require('express').Router()
const { CheckToken } = require('../middlewares/userMiddleware')
const { readAll, login, create, read, update, deleteUser } = require('../controllers/userController')

routes.get('/', CheckToken, readAll)

routes.post('/', create)

routes.get('/:id', CheckToken, read)

routes.put('/:id', CheckToken, update)

routes.delete('/:id', CheckToken, deleteUser)

routes.post('/login', login)

module.exports = routes