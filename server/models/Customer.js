const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;
const CustomerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  total: {
    type: Long,
    default: 0,
  },  
});

module.exports = mongoose.model('Customer', CustomerSchema, 'Customers');
