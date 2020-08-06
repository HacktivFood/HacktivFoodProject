const { User } = require('../models/index.js')
const verifyToken = require('../helpers/jwt.js').verifyToken

function authentication (req, res, next) {
    let token = req.headers.token
    let decoded = verifyToken(token)
    User.findOne({
            where: {
                email: decoded.id
            }
        })
        .then((data) => {
            if (data) {
                req.userData = decoded
                next()
            } else {
                res.status(401).json({msg: 'authentication failed'})
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {authentication}