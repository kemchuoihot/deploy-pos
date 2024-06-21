const router = require("express").Router();
const Phones = require("../models/Phone");
const { Types: { ObjectId } } = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const phones = await Phones.find();
        res.json({Status: true, phones});
        // console.log(phones);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})
router.post('/delete', async (req, res) => {
    try {
        const {id} = req.body;
        const phones = await Phones.findByIdAndDelete({_id: id});
        // console.log(phones);
        res.json({Status: true});
        // console.log(phones);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

router.post('/add', async (req, res) => {
    try {
        const {name,barcode,brand,color,photos,price, desc, importPrice} = req.body;
        const photo = []
        photo[0] = photos;
        const status = "available";
        const phones = await Phones.create({name,barcode,brand,color,photo,price, desc,status,import:importPrice});
        res.json({Status: true});
        console.log(phones);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

router.post('/edit', async (req, res) => {
    try {
        const {id,name,barcode,brand,color,photos,price, desc, importPrice} = req.body;
        const photo = []
        photo[0] = photos;
        const status = "available";
        const phones = await Phones.findByIdAndUpdate({_id: id},{name,barcode,brand,color,photo,price, desc,status,import:importPrice});
        res.json({Status: true});
        console.log(phones);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router;
