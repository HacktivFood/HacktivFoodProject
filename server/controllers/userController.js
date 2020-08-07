const { User } = require('../models/index.js')
const generateToken = require('../helpers/jwt.js').generateToken
const comparePass = require('../helpers/bcrypt.js').comparePass

class userController {
    static register (req, res) {
            User.create({
                email: req.body.email,
                password: req.body.password
            })
            .then((user) => {
                res.status(200).json({users: user})
            })
            .catch((err) => {
                res.status(400).json({errors: err})
            })
    }

    static login (req, res) {
        User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                if (!user) {
                    res.status(401).json({msg: 'invalid email or password'})
                }

                let passComparison = comparePass(req.body.password, user.password)

                if (passComparison) {
                    let payload = {
                        id: user.email,
                        password: user.password
                    }
                    const token = generateToken(payload)
                    res.status(200).json({token: token})
                } else  {
                    res.status(401).json({msg: 'invalid email or password'})
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(401).json({errors: 'invalid email or password'})
            })
    }

    static googleSignIn (req, res, next) {
        let { id_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = null
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
            .then((ticket) => {
                const payload = ticket.getPayload()
                email = payload.email
                return User.findOne({
                        where: {
                            email: payload.email
                        }
                    })
            })
            .then((user) => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        email: email,
                        password: '123456'
                    })
                }
            })
            .then((data) => {
                let payload = {
                    id: data.id,
                    email: data.email
                }
                const token = generateToken(payload)
                console.log(token, '<<< ini token')
                res.status(200).json({token})
            })
            .catch((err) => {
                console.log(err)
                next(err)
            })
    }
}



module.exports = {userController}