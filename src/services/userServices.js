const { readAllM, loginM, createM, readM, updateM, deleteM, existsM } = require('../models/userModel')

const readAllS = async () => {
    const users = await readAllM()
    return users
}

const loginS = async({email, senha}) => {
    const user = await loginM({email, senha})
    return user
}

const createS = async ({nome, email, senha}) => {
    const newUser = await createM({nome, email, senha})
    return newUser
}

const readS = async (id) => {
    const user = await readM(id)
    return user
}

const updateS = async ({id, nome, email, senha}) => {
    const user = await updateM({id, nome, email, senha})
    return user
}

const deleteS = async (id) => {
    const user = await deleteM(id)
    return user
}

const existsS = async (email, id) => {
    const user = await existsM(email, id)
    return user
}

module.exports = {readAllS, loginS, createS, readS, updateS, deleteS, existsS}