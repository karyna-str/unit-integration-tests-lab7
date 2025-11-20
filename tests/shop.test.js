const { isValidItem, calculateDiscount, calculateTotal } = require('../src/cart');
const { checkout } = require('../src/order');
const axios = require('axios');

jest.mock('axios');

// --- 3 МОДУЛЬНИХ ТЕСТИ ---

test('Unit: Товар є валідним, якщо має назву та ціну > 0', () => {
    const validItem = { name: 'Laptop', price: 1000 };
    const invalidItem = { name: 'Bad Item', price: -50 };
    
    expect(isValidItem(validItem)).toBe(true);
    expect(isValidItem(invalidItem)).toBe(false);
});

test('Unit: Знижка розраховується коректно', () => {
    expect(calculateDiscount(100, 20)).toBe(80); // 20% знижка
    expect(calculateDiscount(100, 0)).toBe(100); // 0% знижка
});

test('Unit: Загальна сума кошика рахується правильно', () => {
    const items = [{ price: 100 }, { price: 200 }, { price: 50 }];
    expect(calculateTotal(items)).toBe(350);
});

// --- 2 ІНТЕГРАЦІЙНИХ ТЕСТИ ---

describe('Integration: Оформлення замовлення', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('Integration: Успішна оплата через API з розрахованою сумою', async() => {
        const items = [{ price: 50 }, { price: 50 }]; // Сума 100
        // Мокаємо успішну відповідь від платіжного шлюзу
        axios.post.mockResolvedValue({ data: { id: 'trans_12345' } });

        const result = await checkout(items, 'https://api.payment.com/pay');

        // Перевіряємо, що axios викликали з правильною сумою (інтеграція cart -> order -> axios)
        
expect(axios.post).toHaveBeenCalledWith('https://api.payment.com/pay', { amount: 100 });
        expect(result).toEqual({ status: 'success', transactionId: 'trans_12345' });
    });

    test('Integration: Помилка при порожньому кошику (без виклику API)', async () => {
        const items = [];
        const result = await checkout(items, 'https://api.payment.com/pay');

        expect(result).toEqual({ status: 'error', message: 'Cart is empty' });
        // Перевіряємо, що API не викликався, бо сума 0
        expect(axios.post).not.toHaveBeenCalled(); 
    });
});
