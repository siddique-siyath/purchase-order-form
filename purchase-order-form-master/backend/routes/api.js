const express = require('express');
const router = express.Router();
const PurchaseOrder = require("../models/purchaseOrder")
const OrderNumber = require("../models/orderNumber")

router.get('/', (req, res) => {
    res.send("From API route")
})

router.get('/form', async (req, res) => {
    try {
        const vendors = ['vendor1', 'vendor2', 'vendor3', 'vendor4']
        const products = ['product1', 'product2', 'product3', 'product4']
        let order = await OrderNumber.findOne({});
        console.log(order);
        if (!order) {
            order = { orderNumber: 'PO_000000' }
            try {
                const orderNum = new OrderNumber({
                    orderNumber: order.orderNumber
                })
                orderNum.save()
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
            }
        }
        console.log(order.orderNumber);
        const orderNo = "PO_" + (((order.orderNumber.substring(3)) * 1) + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 6,
            useGrouping: false
        })
        console.log(orderNo);
        const orderDate = new Date()
        res.json({ vendors: vendors, products: products, orderNo: orderNo, orderDate: orderDate })
    } catch (err) {
        console.log(err)
    }
})

router.post('/form', async (req, res) => {
    let order = await OrderNumber.findOne({});
    console.log(order);
    console.log(order.orderNumber);
    const orderNo = "PO_" + (((order.orderNumber.substring(3)) * 1) + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 6,
        useGrouping: false
    })
    console.log(orderNo);
    const orderDate = new Date()
    try {
        const purchaseOrder = new PurchaseOrder({
            vendor: req.body.vendor,
            orderNo: orderNo,
            orderDate: orderDate,
            inventoryLocation: req.body.inventoryLocation,
            itemDetails: req.body.itemDetails,
        })
        purchaseOrder.save()
            .then((result) => {
                console.log(result)
                res.send({ response: 'Data submitted successfully' })
            })
            .catch((err) => {
                console.log(err)
            })
    } catch (err) {
        console.log(err)
    }
    try {
        await OrderNumber.updateOne({}, { $set: { orderNumber: orderNo } })
    } catch (err) {
        console.log(err)
    }
});

router.get('/list', async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.find({ isDeleted: false });
        res.send(purchaseOrders)
    } catch (err) {
        console.log(err)
    }
});

router.post('/update', async (req, res) => {
    try {
        console.log(req.body._id);
        await PurchaseOrder.updateOne({ orderNo: req.body.orderNo },
            {
                $set:
                {
                    isDeleted: req.body.isDeleted,
                    vendor: req.body.vendor,
                    orderDate: req.body.orderDate,
                    inventoryLocation: req.body.inventoryLocation,
                    itemDetails: req.body.itemDetails
                }
            })
        try {
            const purchaseOrders = await PurchaseOrder.find({ isDeleted: false });
            res.send(purchaseOrders)
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;