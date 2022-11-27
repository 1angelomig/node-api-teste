const server = require('./app')
const { connectDb} = require('./models/mongoConnection')

connectDb((err) => {
    if(!err) {
        server.listen(3000, () => {
            console.log("Listening on port 3000")
        })
    }
})