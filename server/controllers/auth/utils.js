import { pbkdf2Sync, randomBytes } from 'crypto'

// generate password
const generatePassword = password => {
    const salt = randomBytes(32).toString('hex')
    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

    return {
        salt: salt,
        hash: hash
    }
}

// validate password
const validatePassword = (password, hash, salt) => {
    const hashVerify = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}

export default generatePassword
export default validatePassword