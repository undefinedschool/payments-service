const express = require('express');
const cors = require('cors');
const generatePayment = require('../api/payments');

const router = express.Router();

router.all('*', cors());

router.route('/mercadopago').post(async (req, res) => {
  try {
    const { paymentType } = req.query;
    const init_point = await generatePayment(req.body, paymentType);

    res.send(init_point);
  } catch (e) {
    console.error(e);

    if (!['card', 'mp'].includes(paymentType)) {
      res.status(400).send('Invalid payment type');
    } else {
      res.status(400).send('Invalid JSON payload');
    }
  }
});

module.exports = router;
