const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ''),
        },
        name: {
            type: String,
            required: [true, 'Nama tidak boleh kosong'],
        },
        username: {
            type: String,
            unique: true,
            trim: true,
            minlength: 6,
            required: [true, 'Username tidak boleh kosong'],
        },
        password: {
            type: String,
            required: [true, 'Password tidak boleh kosong'],
            minlength: 6,
            select: false,
        },
    },
    {
        timestamps: true,
        collection: 'users',
    }
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateToken = function () {
    const {
        JWT_ACCESS_TOKEN_KEY,
        JWT_ACCESS_TOKEN_EXPIRES_IN,
        JWT_REFRESH_TOKEN_KEY,
        JWT_REFRESH_TOKEN_EXPIRES_IN,
    } = process.env

    const payload = { _id: this._id, username: this.username }

    const accessToken =
        process.env.PREFIX_TOKEN +
        jwt.sign(payload, JWT_ACCESS_TOKEN_KEY, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
        })

    const refreshToken =
        process.env.PREFIX_TOKEN +
        jwt.sign(payload, JWT_REFRESH_TOKEN_KEY, {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
        })

    return { accessToken, refreshToken }
}

module.exports = mongoose.model('User', UserSchema)
