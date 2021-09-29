const User = require('../models/user')

const checkUsername = username => {
    return User.findOne({ username: username }).then(result => {
        if (result) throw new Error('این نام کاربری قبلا ثبت شده است')
    })
}

const validUsername = username => {
    return User.findOne({ username: username }).then(result => {
        if (!result) throw new Error('کاربری با این مشخصات ثبت نشده است')
    })
}

const checkEmail = email => {
    return User.findOne({ email: email }).then(result => {
        if (result) throw new Error('کاربری با این آدرس ایمیل قبلا ثبت نام کرده است')
    })
}

module.exports = {
    checkUsername,
    validUsername,
    checkEmail
}