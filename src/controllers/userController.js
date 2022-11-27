const { readAllS, loginS, createS, readS, updateS, deleteS, existsS } = require('../services/userServices')
const jwt = require('jsonwebtoken')

const secret = 'ANSFGHNASUGHASHGASHGUASHGUAHGASHG'

const readAll = async (req, res) => {
    const users = await readAllS()
    return res.status(200).json(users)
}

const login = async (req, res) => {
    const {email, senha} = req.body

    if(!email) {
        return res.status(422).json({msg:"Missing email"})
    } if(!senha) {
        return res.status(422).json({msg:"Missing senha"})
    }

    const user = await loginS({email, senha})
    if(!user) return res.status(404).json({msg:"Not found"})

    try {
        const {_id} = user
        const newToken = jwt.sign(
            {
                id:_id,
                email
            },
            secret,
        )
        return res.status(201).json({token:newToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Server error"})
    }
}

const create = async (req, res) => {
    const {nome, email, senha} = req.body

    if(!nome) {
        return res.status(422).json({msg:"Missing name"})
    } if(!email) {
        return res.status(422).json({msg:"Missing email"})
    } if(!senha) {
        return res.status(422).json({msg:"Missing password"})
    }

    const existsUser = await existsS(email, null)
    if(existsUser){
        return res.status(422).json({msg:"Email already in use"})
    }

    try {
        const user = await createS({nome, email, senha})
        res.status(200).json({msg:"Successful", user})
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
}

const read = async (req, res) => {
    const id = req.params.id

    const user = await readS(id)
    if(!user) return res.status(404).json({msg:"Not found"})

    return res.status(200).json(user)
}

const update = async (req, res) => {
    const {nome, email, senha} = req.body
    const {id} = req.params

    const userE = await existsS(null, id)
    if(!userE) return res.status(404).json({msg:"Not found"}) 

    const user = await updateS({id, nome, email, senha})
    return res.status(200).json({msg:"Successful", user})
}

const deleteUser = async (req, res) => {
    const id = req.params.id

    const existsU = await existsS(null, id)
    if(!existsU) return res.status(404).json({msg:"Not found"})

    const user = await deleteS(id)
    return res.status(200).json({msg:"Successful", user})
}

module.exports = {readAll, login, create, read, update, deleteUser}