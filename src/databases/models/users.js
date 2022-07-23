const mongoose = require('mongoose')
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
    },
    {
        timestamps: true,
        collection: 'users',
    }
)

module.exports = mongoose.model('User', UserSchema)
