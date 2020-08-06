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
}

module.exports = {userController}