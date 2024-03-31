const mongoose = require('mongoose')


  const regSchema =mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})




  module.exports = mongoose.model('reg',regSchema)