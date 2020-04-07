const fetch = require('node-fetch');

const { MP_ACCESS_TOKEN, MP_BASE_URL, IMG_URL } = process.env;

function generatePreference({ id, title, unit_price }, paymentType) {
  const PAY_WITH_CARD = [{ id: 'ticket' }, { id: 'atm' }];
  const PAY_WITH_MP = [...PAY_WITH_CARD, { id: 'debit_card' }, { id: 'credit_card' }];
  const US_URL = 'https://undefinedschool.io';

  return {
    items: [
      {
        id,
        currency_id: 'ARS',
        title,
        unit_price,
        quantity: 1,
        picture_url: IMG_URL
      }
    ],
    back_urls: {
      success: US_URL,
      failure: US_URL,
      pending: US_URL
    },
    auto_return: 'approved',
    payment_methods: {
      excluded_payment_types: paymentType === 'card' ? PAY_WITH_CARD : PAY_WITH_MP,
      installments: 1,
      default_installments: 1
    }
  };
}

function generatePayment(data, paymentType) {
  const preference = generatePreference(data, paymentType);

  return fetch(`${MP_BASE_URL}${MP_ACCESS_TOKEN}`, {
    method: 'POST',
    body: JSON.stringify(preference),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(res => res.init_point)
    .catch(console.error);
}

module.exports = generatePayment;
