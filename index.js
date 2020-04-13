const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const helmet = require('helmet');
const router = require('./routes');

const { PORT = 8080 } = process.env;
const app = express();

app.use(helmet());
app.use(express.json());
app.use(router);

const server = app.listen(PORT);
