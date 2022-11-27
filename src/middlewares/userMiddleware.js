const jwt = require('jsonwebtoken')

const secret = 'ANSFGHNASUGHASHGASHGUASHGUAHGASHG'

function CheckToken(req, res, next) {
    const auth = req.headers['authorization']
    const token = auth && auth.split(' ')[1]
    jwt.verify(token, secret, (err) => {
        if(err){
            return res.status(401).json({msg:"Invalid token"})
        }
        return next()
    })
}

module.exports = {CheckToken}