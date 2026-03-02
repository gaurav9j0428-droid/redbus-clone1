const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyparser.json());

/* ✅ CONNECT TO MONGODB HERE */
mongoose.connect("mongodb://127.0.0.1:27017/redbus")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

/* ROUTES */
const customerroutes = require("./routes/customer");
const routesroute = require("./routes/route");
const bookingroute = require("./routes/booking");
const reviewRoute = require("./routes/review");

app.use(bookingroute);
app.use(routesroute);
app.use(customerroutes);
app.use("/review", reviewRoute);

app.get('/', (req, res) => {
    res.send('Hello, Ted bus is working');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});