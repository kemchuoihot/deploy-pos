const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');

router.post('/', async (req, res) => {
    try {
        const { phoneNumber, total } = req.body;
        const order = new Order({ customer_id:phoneNumber, total: Number(total) });
        const customer = await Customer.findOne({ phone_number: phoneNumber});
        
        if (customer) {
            customer.total += total;
            await order.save();
            const updatedCustomer = await customer.save();
            if(updatedCustomer){
                return res.json({ success: true, message: "Thành công!" });
            }
            else{
                return res.json({ success: false, message: "Lỗi trong quá trình xử lý!" });
            }
        }
        
        return res.status(201).send("Order created successfully!");
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message });
    }
}); 

module.exports = router;