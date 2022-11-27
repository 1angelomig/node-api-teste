const { getDb, getObjId } = require('./mongoConnection')

const readAllM = async () => {
    const db = await getDb()
    return db.collection('users').find().project({_id:1,nome:1,email:1}).toArray()
}

const createM = async ({nome, email, senha}) => {
    const db = await getDb()
    await db.collection('users').insertOne({nome, email, senha})
    return {nome, email}
}

const readM = async (id) => {
    const db = await getDb()
    const ObjectID = await getObjId()
    const user = await db.collection('users').findOne({_id: new ObjectID(id)}, {projection: {'_id':1,'nome':1,'email':1}})
    return user
}

const updateM = async ({id, nome, email, senha}) => {
    const db = await getDb()
    const ObjectID = await getObjId()
    await db.collection('users').updateOne({_id: new ObjectID(id)}, {$set: {nome, email, senha}})
    return {id, nome, email}
}

const deleteM = async (id) => {
    const db = await getDb()
    const ObjectID = await getObjId()
    await db.collection('users').deleteOne({_id: new ObjectID(id)})
    return {id}
}

const loginM = async ({email, senha}) => {
    const db = await getDb()
    const user = await db.collection('users').findOne({email:email, senha:senha})
    return user
}

const existsM = async (email, id) => {
    const db = await getDb()
    let user = null;
    if(email) {
        user = await db.collection('users').findOne({email:email})
    } if(id){
        const ObjectID = await getObjId()
        user = await db.collection('users').findOne({_id: new ObjectID(id)})
    }
    
    return user
}

module.exports = {createM, readAllM, readM, updateM, deleteM, loginM, existsM}