// 1. Модульна функція: Перевірка валідності товару
function isValidItem(item) {
    return item && typeof item.name === 'string' && item.price > 0;
}

// 2. Модульна функція: Розрахунок знижки
function calculateDiscount(price, discountPercent) {
    if (discountPercent < 0 || discountPercent > 100) return price;
    return price - (price * (discountPercent / 100));
}

// 3. Модульна функція: Підрахунок загальної суми
function calculateTotal(items) {
    return items.reduce((total, item) => total + item.price, 0);
}

module.exports = { isValidItem, calculateDiscount, calculateTotal };
