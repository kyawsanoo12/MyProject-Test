const express = require('express');
require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

const app = express();
const route = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

app.set('layout', "layouts/layout");

app.use(expressLayouts);

//router
app.use('/', route);

//Static 
app.use(express.static('public'));

//Database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.warn(err));
db.on('open', () => {
    console.log('Database connected!')
})

//listen port
app.listen(process.env.PORT);