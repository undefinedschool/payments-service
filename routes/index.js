const express = require('express');
const router = express.Router();
const cors = require('cors');
const generatePayment = require('../api/payments');

router.all('*', cors());

router.route('/mercadopago').post(async (req, res) => {
  const { paymentType } = req.query;
  const init_point = await generatePayment(req.body, paymentType);

  res.send(init_point);
});

module.exports = router;
