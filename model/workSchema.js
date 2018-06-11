const mongoose = require('mongoose')

const workSchema = mongoose.Schema({
    imgurl: String,
    userId: String,
    content: String,
    userIcon: String,
    username: String,
    like: String,
    share: String,
}, { collection: 'work' })

const Work = module.exports = mongoose.model('work', workSchema);
