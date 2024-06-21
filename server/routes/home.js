const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const Phone = require('../models/Phone');
const Customer = require('../models/Customer');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
  try {
    const phones = await Phone.find();
    // console.log(phones);
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { barcode, name, brand, color, photo, desc, price, status } = req.body;
    const phone = new Phone({ barcode, name, brand, color, photo, desc, price, status });
    await phone.save();
    res.status(201).send(phone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  console.log(req.body);
});

router.get('/barcode/:barcode', async (req, res) => {
  const barcode = req.params.barcode;

  try {
    const iphone = await Phone.findOne({ barcode: barcode});

    if (!iphone) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm với mã vạch này.' });
    }

    res.status(200).json(iphone);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm.' });
  }
});


module.exports = router;