const axios = require('axios');
const { calculateTotal } = require('./cart');

// Інтеграційна функція: Оформлення замовлення (використовує cart.js та зовнішній API)
async function checkout(items, paymentUrl) {
    const total = calculateTotal(items);
    if (total <= 0) return { status: 'error', message: 'Cart is empty' };

    try {
        const response = await axios.post(paymentUrl, { amount: total });
        return { status: 'success', transactionId: response.data.id };
    } catch (error) {
        return { status: 'failed', message: 'Payment error' };
    }
}

module.exports = { checkout };
