const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const Customer = require('../models/Customer');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    try {
        const customer = await Customer.find();
        res.json({Status: true, customer});
        console.log(customer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
router.post('/checkout', async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const customer = await Customer.findOne({ phone_number: phoneNumber });

        if (customer) {
            res.json({ success: true, customer });
        } else {
            res.json({ success: false, message: 'Không tìm thấy thông tin khách hàng. Vui lòng nhập thông tin mới.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Lỗi trong quá trình xử lý.' });
    }
});

router.post('/create', async (req, res) => {
    const { fullName, address, phoneNumber } = req.body;

    try {
        const existingCustomer = await Customer.findOne({ phone_number: phoneNumber });

        if (existingCustomer) {
            return res.status(400).json({ success: false, message: 'Số điện thoại đã tồn tại trong hệ thống.' });
        }

        const newCustomer = new Customer({
            fullname: fullName,
            address: address,
            phone_number: phoneNumber, // Chắc chắn rằng phoneNumber được cung cấp
        });

        const savedCustomer = await newCustomer.save();

        if (savedCustomer) {
            res.json({ success: true, message: 'Tạo tài khoản thành công.' });
        } else {
            res.status(500).json({ success: false, message: 'Không thể tạo tài khoản mới.' });
        }
    } catch (error) {
        console.error('Error during account creation:', error); // Log error object để xem chi tiết lỗi
        res.status(500).json({ success: false, message: 'Lỗi trong quá trình xử lý.' });
    }
});

router.post('/payment', async (req, res) => {
    const { phoneNumber, total } = req.body;
    // console.log(phoneNumber, total);
    try {
        const customer = await Customer.findOne({ phone_number: phoneNumber});
        if (customer) {
            customer.total += total;
            const updatedCustomer = await customer.save();
            if(updatedCustomer){
                res.json({ success: true, message: "Thành công!" });
            }
            else{
                res.json({ success: false, message: "Lỗi trong quá trình xử lý!" });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;