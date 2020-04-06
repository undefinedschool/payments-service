const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(router);

const server = app.listen(PORT);
