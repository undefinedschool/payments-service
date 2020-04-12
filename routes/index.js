const express = require('express');
const cors = require('cors');
const generatePayment = require('../api/payments');

const router = express.Router();

router.all('*', cors());

router.get('/', (req, res) => res.sendFile('./public/index.html'));

router.get('/health', (req, res) => res.sendStatus(200));

router
  .route('/mercadopago')
  .head((req, res) => res.sendStatus(200))
  .post('/mercadopago', async (req, res) => {
    try {
      const { paymentType } = req.query;
      const init_point = await generatePayment(req.body, paymentType);

      res.json({ CHECKOUT_URL: init_point });
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
