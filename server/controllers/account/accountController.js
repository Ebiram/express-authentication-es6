import User from '../../models/user.js'
import { generatePassword } from '../auth/utils.js'

const index = (req, res) => {
    return res.json({
        username: req.user.username,
        email: req.user.email
    })
}

const changePassword = (req, res) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) {
            return res.status(400).json(err)
        }
        const password = generatePassword(req.body.password)
        const hash = password.hash
        const salt = password.salt
        user.password = password
        user.hash = hash
        user.salt = salt
        user.save().then(user => {
            res.json({ success: true, user: user })
        }).catch(err => {
            res.status(400).json({ message: err })
        })
    })
}

export default index
export default changePassword