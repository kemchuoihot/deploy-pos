const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        ref: 'Customer',
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    order_date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
});
module.exports = mongoose.model('Order', OrderSchema, 'Orders');