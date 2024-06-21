const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send("Admin page")
});

module.exports = routes;