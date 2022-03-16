const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const historyRouter = require('./routes/history');
const organizationsRouter = require('./routes/organization');
const newsRouter = require('./routes/news')

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/history', historyRouter);
app.use('/api/organization', organizationsRouter);
app.use('/api/news', newsRouter);

module.exports = app;
