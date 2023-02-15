const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const purchaseOrderSchema = new Schema({
    isDeleted:{ type: Boolean, default: false },
    vendor: String,
    orderNo: String,
    orderDate:Date,
    inventoryLocation:String,
    itemDetails:[{
        productName:String,
        quantity:Number,
        amount:Number,
        discount:Number,
        tax:Number,
        total:Number,
    }]
}, { timestamps: true })

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema)