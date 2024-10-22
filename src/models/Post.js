import { Schema, model } from 'mongoose'

const postSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    author: {
        _id: { type: Schema.Types.ObjectId, ref: 'User' },
        username: { type: String },
        email: { type: String }
    },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Post', postSchema)
