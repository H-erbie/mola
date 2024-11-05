const mongoose = require('mongoose')
const SherpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide meter name'],
        maxlength: 50,
    },
    meterNum: {
        type: Number,
        required: [true, 'please provide meter number '],
        maxlength: 100,
    },address: {
        type: String,
        required: [true, 'please provide address '],
        maxlength: 100,
    },
    meterRead: {
        type: Number,
        required: [true, 'please provide meter readings '],
        maxlength: 100,
    },
    initBy: {
        type: String,
        required: [true, 'please provide user-email']
    }
}, {timestamps: true})

module.exports = mongoose.model('Sherp',SherpSchema)