require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const accountRoutes = require('./routes/account');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const androidRoutes = require('./routes/android');
const customerRoutes = require('./routes/customer');
const verifyRoutes = require('./routes/verify')
const productsRoutes = require('./routes/product')
const changePass = require('./routes/changePass');
const order = require('./routes/order');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.MONGO;
// const connect = async () => {
//   mongoose.connect(uri)
//   .then(()=>{
//    console.log("Connected to Mongo's server");
//   })
//   .catch(err => console.log("Error connecting")
//    );
// }
// mongoose.connection.on("disconnected", () =>{
//   console.log("Disconnected from Mongo");
// })
// mongoose.connection.on("connected", () =>{
//   console.log("MongoDB is connected");
// })
mongoose.connect(uri);
app.get('/', (req, res) =>
  res.send('oke')
);
// app.use('/', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


app.use("/account", accountRoutes);
app.use("/auth", authRoutes);
app.use("/verify",verifyRoutes);
app.use("/home",homeRoutes);
app.use("/android",androidRoutes);
app.use("/customer", customerRoutes);
app.use("/order",order)
app.use("/product",productsRoutes);
app.use("/changePass",changePass);

app.use(cors());

// if(process.env.NODE_ENV === 'production'){
//   const path = require('path');
//   app.use(express.static('client/build'));
//   app.use('/', express.static(path.join(__dirname, 'client', 'build')));
//   app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'client','build','index.html'));
//   })
// }

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
