const express = require('express');
const cors = require('cors');
const generatePayment = require('../api/payments');

const router = express.Router();

router.all('*', cors());

router.route('/mercadopago').post(async (req, res) => {
  const { paymentType } = req.query;
  const init_point = await generatePayment(req.body, paymentType);

  res.send(init_point);
});

module.exports = router;
