const User = require('../../models/user')
const { generatePassword } = require('./utils')

const registerController = (req, res) => {
    const password = generatePassword(req.body.password)
    const hash = password.hash
    const salt = password.salt

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        hash: hash,
        salt: salt
    })

    user.save().then(user => {
        res.json({ success: true, user: user })
    }).catch(err => {
        res.status(400).json({ message: err })
    })
}

module.exports = registerController