const mongoose = require('mongoose')

const workSchema = mongoose.Schema({
    imgurl: String,
    userId: String,
    content: String,
    username: String,
    like: Number,
    share: Number,
    likeContract:Array
}, { collection: 'work' })

const Work = module.exports = mongoose.model('work', workSchema);
