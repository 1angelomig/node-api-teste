const { MongoClient } = require('mongodb')
const ObjectID = require('mongodb').ObjectId;

let dbConnection
const dbUser = 'root'
const dbPass = 'root'
const dbURL = `mongodb+srv://${dbUser}:${dbPass}@cluster0.yarh342.mongodb.net/?retryWrites=true&w=majority`

module.exports = {
    connectDb: (cb) => {
        MongoClient.connect(dbURL)
          .then((client) => {
            dbConnection = client.db()
            console.log("Database connected")
            return cb()
          })
          .catch((err) => {
            console.log(err)
            return cb(err)
          })
    },
    getDb: () => dbConnection,
    getObjId: () => ObjectID
}