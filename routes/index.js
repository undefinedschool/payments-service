const express = require('express');
const router = express.Router();
const generatePayment = require('../payments');

router.route('/mercadopago').post(async (req, res) => {
  const { paymentType } = req.query;
  const init_point = await generatePayment(req.body, paymentType);

  res.send(init_point);
});

module.exports = router;
