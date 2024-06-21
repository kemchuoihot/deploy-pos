const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const Phone = require('../models/Phone');
const Customer = require('../models/Customer');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async(req, res) => {
    try {
      const androidPhones = await Phone.find({brand: 'Android'});
      console.log(androidPhones);
      res.status(200).json(androidPhones);
    } catch(error) {
      res.status(500).json({message: 'Server error'});
    }
  });

router.post('/', async (req, res) => {
  try {
    const { barcode, name, brand, color, photo, desc, price, status } = req.body;
    const androidPhones = new Phone({ barcode, name, brand, color, photo, desc, price, status });
    await androidPhones.save();
    res.status(201).send(phone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  console.log(req.body);
});

router.get('/barcode/:barcode', async (req, res) => {
  const barcode = req.params.barcode;

  try {
    const androidPhone = await Phone.findOne({ barcode: barcode, brand: 'Android' });

    if (!androidPhone) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm với mã vạch này.' });
    }

    res.status(200).json(androidPhone);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm.' });
  }
});
//// jhfjdhfjdhfjhdjfhdjfhdjf

module.exports = router;