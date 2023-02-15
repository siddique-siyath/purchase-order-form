const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const orderNumberSchema = new Schema({
    orderNumber: String
}, { timestamps: true })

module.exports = mongoose.model('OrderNumber', orderNumberSchema)